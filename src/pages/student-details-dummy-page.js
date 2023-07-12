import StudentDetailsModal from "../components/student-details-modal";
import { useState } from "react";
import profileImage from "../assets/Yasiru.jpg"

export default function StudentDetailsDummyPage() {
    const [open, setOpen] = useState(true)
    const onClose = () => {
        setOpen(false)
    }
    const person = {
        name:"Yasiru Lakshan",
        index:"190331A",
        profilePicture:profileImage
    }

  return <StudentDetailsModal person={person} open={open} onClose={onClose}/>;
}
