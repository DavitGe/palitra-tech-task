const BrokenImage = ({
  color = "#000000",
  size = 16,
}: {
  color: string;
  size: number;
}) => {
  return (
    <svg
      id="No-Image--Streamline-Carbon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      height={size}
      width={size}
    >
      <path
        d="M15 1.70705 14.29295 1 1 14.29295 1.70705 15l1 -1H13a1.00135 1.00135 0 0 0 1 -1V2.70705ZM13 13H3.70705l3.89645 -3.8965 1.1894 1.18935a1 1 0 0 0 1.4142 0L11 9.5l2 1.99865Zm0 -2.9159 -1.2929 -1.29295a1 1 0 0 0 -1.4142 0L9.5 9.5841l-1.1885 -1.18855L13 3.70705Z"
        fill={color}
        stroke-width="0.5"
      ></path>
      <path
        d="M3 11v-1.5l2.5 -2.4983 0.68665 0.68665 0.70795 -0.708 -0.6875 -0.6875a1 1 0 0 0 -1.4142 0L3 8.0858V3h8V2H3a1.001 1.001 0 0 0 -1 1v8Z"
        fill={color}
        stroke-width="0.5"
      ></path>
      <path
        id="_Transparent_Rectangle_"
        d="M0 0h16v16H0Z"
        fill="none"
        stroke-width="0.5"
      ></path>
    </svg>
  );
};

export default BrokenImage;
