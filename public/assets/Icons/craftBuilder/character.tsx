import { theme } from "antd";

export default () => {
  const { token } = theme.useToken();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      width="256"
      height="256"
    >
      <path
        fill={token.colorPrimary}
        d="M20.94 22H3.06a1 1 0 0 1-.994-1.108 9.995 9.995 0 0 1 19.868 0A1 1 0 0 1 20.94 22Z"
      ></path>
      <path
        fill="#dee1ec"
        d="m12.708 18.307 4.706-4.715a10.001 10.001 0 0 0-10.833.003l4.712 4.712A1 1 0 0 0 12 18.6a1.002 1.002 0 0 0 .708-.293Z"
      ></path>
      <path
        fill={token.colorPrimaryBorderHover}
        d="M11.995 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6Z"
      ></path>
      <path
        fill={token.colorPrimary}
        d="M6.09 9a5.993 5.993 0 0 0 11.82 0Z"
      ></path>
    </svg>
  );
};
