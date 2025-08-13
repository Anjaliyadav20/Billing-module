
import { useState, useRef, useEffect } from "react"
import { ChevronLeft } from "lucide-react"
import ErrorIcon from "../../assets/ErrorIcon.png"

export const OtpVerification = ({
    email = "john@company.domain.com",
    onVerify,
    onBackToLogin,
    onResendCode,
}) => {
    const [code, setCode] = useState(Array(6).fill(""))
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [timeLeft, setTimeLeft] = useState(0)
    const [canResend, setCanResend] = useState(true)
    const inputRefs = useRef([])
    const timerRef = useRef(null)

    const handleInputChange = (index, value) => {
        if (value.length > 1) return // Prevent multiple characters

        const newCode = [...code]
        newCode[index] = value

        setCode(newCode)

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)
        const newCode = Array(6).fill("")

        for (let i = 0; i < pastedData.length; i++) {
            if (/^\d$/.test(pastedData[i])) {
                newCode[i] = pastedData[i]
            }
        }

        setCode(newCode)

        // Focus the next empty input or the last input
        const nextEmptyIndex = newCode.findIndex((digit) => !digit)
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
        inputRefs.current[focusIndex]?.focus()
    }

    const handleVerify = async () => {
        const verificationCode = code.join("")
        if (verificationCode.length === 6) {
            setIsLoading(true)
            setError("")
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

                // Simulate wrong OTP (for demo - you can remove this)
                if (verificationCode === "123456") {
                    setError("Wrong OTP entered, Try again by requesting new code")
                    return
                }

                onVerify?.(verificationCode)
            } catch (err) {
                setError("Wrong OTP entered, Try again by requesting new code")
            } finally {
                setIsLoading(false)
            }
        }
    }

    const handleResendCode = async () => {
        // Clear inputs and error
        setCode(Array(6).fill(""))
        setError("")

        // Start timer
        setCanResend(false)
        setTimeLeft(60)

        // Focus first input
        inputRefs.current[0]?.focus()

        // Call the resend function
        onResendCode?.()
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }


    const isCodeComplete = code.every((digit) => digit !== "")

    // Timer effect
    useEffect(() => {
        if (timeLeft > 0) {
            timerRef.current = setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
        } else if (timeLeft === 0 && !canResend) {
            setCanResend(true)
            setError("This code has expired. Please request a new one")
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
        }
    }, [timeLeft, canResend])

    useEffect(() => {
        // Focus first input on mount
        inputRefs.current[0]?.focus()
    }, [])

    return (
        <div className="email-verification-container">
            <div className="email-verification-card">
                <div className="email-verification-content">
                    <h2 className="email-verification-title">Verify your email</h2>
                    <p className="email-verification-subtitle">
                        Enter the 6-digit code sent you at
                        <br />
                        <span className="email-address">{email}</span>
                    </p>

                    <div className="code-input-container">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={handlePaste}
                                className="code-input"
                                aria-label={`Digit ${index + 1}`}
                            />
                        ))}
                    </div>

                    {error && (
                        <div className="Error">
                            <img src={ErrorIcon} alt="" />
                            {error}
                        </div>
                    )}

                    <button onClick={handleVerify} disabled={!isCodeComplete || isLoading} className="verify-button">
                        {isLoading ? "Verifying..." : "Verify & Continue"}
                    </button>

                    <div className="email-verification-footer">
                        <button onClick={onBackToLogin} className="back-to-login-button">
                            <ChevronLeft size={16} />
                            Back to Login
                        </button>

                        <div className="resend-section">
                            <span className="resend-text">Didn't received? </span>
                            {canResend ? (
                                <button onClick={handleResendCode} className="resend-button">
                                    Resend code
                                </button>) :
                                <span className="text-grey">Resend code ({formatTime(timeLeft)})</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
