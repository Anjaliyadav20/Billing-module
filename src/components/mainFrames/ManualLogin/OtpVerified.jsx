// This component contaion otp verfication code.

export const OtpVerified = ({handleNextSteps}) => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                maxHeight: "100vh"
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "62px 48px ",
                }}
            >
               <div className="checkmark-svg">
                        <svg
                            className="checkmark-animated"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#16A34A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            >
                        <circle className="checkmark-circle" cx="12" cy="12" r="10" />
                        <path className="checkmark-check" d="M9 12l2 2 4-4" />
                        </svg>
                    </div>
                <div style={{ marginBottom: "8px", fontSize: "24px", marginTop: "12px" }}>OTP Verified!</div>
                <p style={{ color: "#6b7280", fontSize: "14px" }}>You're all set, we'll now start fetching bills and <br /> documents automatically</p>
                <button onClick={handleNextSteps} className="next-step-btn ">
                    {"Next Steps"}
                </button>
            </div>
        </div>
    )
}