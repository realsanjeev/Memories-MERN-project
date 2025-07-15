import { styled } from "@mui/material/styles";
import {
    Card,
    CardActions,
    CardMedia,
    Typography,
    ButtonBase
} from "@mui/material";

const styles = {
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9 aspect ratio
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "darken",
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    border: {
        border: "solid",
    },
    fullHeightCard: {
        height: "100%",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        width: "100%",
        minWidth: "280px",
        maxWidth: "100%",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        },
    },
    overlay: {
        position: "absolute",
        top: "20px",
        left: "20px",
        color: "white",
        textShadow: "0 2px 4px rgba(0,0,0,0.6)",
    },
    overlay2: {
        position: "absolute",
        top: "20px",
        right: "20px",
        color: "white",
    },
    grid: {
        display: "flex",
    },
    details: {
        display: "flex",
        justifyContent: "space-between",
        margin: "20px",
    },
    title: {
        padding: "0 16px",
        marginTop: "8px",
        fontWeight: 600,
    },
    cardActions: {
        padding: "8px 16px 12px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    cardAction: {
        display: "block",
        textAlign: "initial",
        width: "100%",
    },
}

const StyledCard = styled(Card)(styles.card);
const StyledCardMedia = styled(CardMedia)(styles.media);
const Overlay = styled("div")(styles.overlay);
const Overlay2 = styled("div")(styles.ovelay2);
const Details = styled("div")(styles.details);
const StyledTitle = styled(Typography)(styles.title);
const StyledCardActions = styled(CardActions)(styles.cardActions);
const StyledButtonBase = styled(ButtonBase)(styles.cardAction);

export {
    StyledCard,
    StyledCardMedia,
    Overlay,
    Overlay2,
    Details,
    StyledTitle,
    StyledCardActions,
    StyledButtonBase
};