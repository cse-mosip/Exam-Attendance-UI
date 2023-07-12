import { Box, Typography } from "@mui/material"
import ExaminerCustomLoginComponent from "../components/examiner-custom-login"
import FingerprintScanner from "../components/fingerprint-scanner"

const [isBioLogin, setIsBioLogin] = useState(false)

export default function ExaminerLoginPage(){
    return (
        <Box>
            <Typography variant="h1" sx={styles.title}>Examiner Login</Typography>
            
            <FingerprintScanner isStudent={true}/>
        </Box>
    )
}

const styles = {
    title:{
        color:"#0170D6",
        display:"flex",
        justifyContent: "center",
        padding:"4rem"
    },

    examinerLoginBio:{
        display:"flex",
        justifyContent: "center",
    }
}