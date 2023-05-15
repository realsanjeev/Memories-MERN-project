import { styled } from "@mui/material/styles";

const theme = styled(({ theme }) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: theme.palette.primary.main,
  },
  image: {
    marginLeft: "1500px",
  },
}))

export default theme;