import { theme } from "antd";

export default () => {
    const { token } = theme.useToken();
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            viewBox="0 0 24 24"
            width="256"
            height="256"
        >
            <path
                fill={token.colorPrimary}
                d="M16 9a2 2 0 0 1-2-2V2h-4a2.996 2.996 0 0 0-3 2.992V15a2.996 2.996 0 0 0 2.992 3H18a2.996 2.996 0 0 0 3-2.992V9h-5z"
            ></path>
            <path
                fill="#dee1ec"
                d="M10 18h-.008A2.996 2.996 0 0 1 7 15V6H6a2.996 2.996 0 0 0-3 2.992V19a2.996 2.996 0 0 0 2.992 3H14a2.996 2.996 0 0 0 3-2.992V18h-7z"
            ></path>
            <path
                fill={token.colorPrimaryBgHover}
                d="M21 9h-5a2 2 0 0 1-2-2V2l7 7z"
            ></path>
        </svg>
    );
};
