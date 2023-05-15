// import { styled } from "@mui/system";

// export default styled ( theme => ({
//     root: {
//         "& .MuiTextField-root": {
//             margin: theme.spacing(1),
//         },
//     },
//     paper: {
//         padding: theme.spacing(1),  
//     },
//     form: {
//         display: "flex",
//         flexWrap: "wrap",
//         justifyContent: "center",
//     },
//     fileInput: {
//         width: "97%",
//         margin: "10px 0",
//     },
//     buttonSubmit: {
//         marginButton: 10,
//     },
// }));



import { styled } from "@mui/system";

const StyledComponent = styled("div")(({ theme }) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: theme.palette.primary.main,
  },
  image: {
    marginLeft: "15px",
  },
}));

export default function CustomComponent(props) {
  return <StyledComponent {...props} />;
}
