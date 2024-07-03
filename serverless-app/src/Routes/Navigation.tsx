import { Route, Routes } from "react-router-dom"
import { SignupPage } from "../Components/SignupPage"
import { LoginPage } from "../Components/LoginPage"
import { UserListPage } from "../Components/UserListPage"
import { ImageUploadPage } from "../Components/ImageUpload"
import ImageListPage from "../Components/ImageListPage"
import Layout from "../Components/Layout"
import { CreateEvent } from "../Components/CreateEvent"
import EventList from "../Components/EventList"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" Component={SignupPage} />
            <Route path="/login" Component={LoginPage} />
            <Route path="/userlist" element={<Layout><UserListPage /></Layout>} />
            <Route path="/imageupload" element={<Layout><ImageUploadPage /></Layout>} />
            <Route path="/imagelist" element={<Layout><ImageListPage /></Layout>} />
            <Route path="/create-event" element={<Layout><CreateEvent /></Layout>} />
            <Route path="/eventlist" element={<Layout><EventList /></Layout>} />
            {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
    )
}

export default AppRoutes
