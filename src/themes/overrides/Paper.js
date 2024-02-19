export default function Paper(theme) {
  const { palette, transitions, customShadows, shape: { borderRadius } } = theme;

  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          width: '100%',
          backgroundColor: palette?.common?.paper,
          backgroundRepeat: "no-repeat, no-repeat",
          backgroundPosition: "right top, left bottom",
          backgroundSize: "50%, 50%",
          padding: "10px",
          overflow: "hidden",
        },
        rounded: {
          borderRadius: `${borderRadius / 2}px`
        }
      }
    }
  };
}
