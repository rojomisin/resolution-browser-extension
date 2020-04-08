import { createStyles, Theme } from '@material-ui/core';

const ConnectStyles = ({ spacing }: Theme) => createStyles({
  background: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `#f9faff`
  },
  paper: {
    padding: spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "42vw"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing(2),
    margin: spacing(1),
  },
  controlBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: spacing(2)
  },
  image: {
    height: "200px"
  },
  button: {
    color: "white",
    backgroundColor: "#4c47f7",
    height: "40px"
  }
});


export default ConnectStyles;