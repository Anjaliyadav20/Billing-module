

import { useEffect, useState } from "react"
import EmailConnected from "./EmailConnected"
import { OtpVerified } from "./OtpVerified"
import { OtpVerification } from "./OtpVerification"
import EmailLogin from "./EmailLogin"

export default function EmailVerificationDemo({ onStepComplete }) {
    const [isVerified, setIsVerified] = useState(false)
    const [isNextClicked, setIsNextClicked] = useState(false)
    const [isBackClicked, setIsBackClicked] = useState(false)

    const handleVerify = (code) => {
        console.log("Verification code:", code)
        setIsVerified(true)
    }

    const handleBackToLogin = () => {
        setIsBackClicked(true)
    }

    const handleResendCode = () => {
        console.log("Resend code clicked")
    }

    const handleNextSteps = () => {
        setIsNextClicked(true)
        setIsVerified(false)
    }

    if (isVerified) {
       return(
        <OtpVerified handleNextSteps={handleNextSteps} />
       )
    }
    else if (isNextClicked) {
        return (
            <EmailConnected onStepComplete={onStepComplete} />
        )
    } 
    else if (isBackClicked){ 
        return (
            <EmailLogin />
        )
    }

    return (
        <OtpVerification
            email="john@company.domain.com"
            onVerify={handleVerify}
            onBackToLogin={handleBackToLogin}
            onResendCode={handleResendCode}
        />
    )
}
