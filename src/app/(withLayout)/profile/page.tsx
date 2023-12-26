import AntdLayoutWrapper from '@antdComponent/layoutWrapper'
import LoggedInUserProfile from '@template/loggedInUserProfile'

function page() {
    return (
        <AntdLayoutWrapper>
            <LoggedInUserProfile />
        </AntdLayoutWrapper>
    )
}

export default page