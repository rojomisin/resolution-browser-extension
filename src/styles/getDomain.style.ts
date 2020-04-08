import {createStyles, Theme} from '@material-ui/core';

const getDomainStyles = ({spacing}: Theme)  => createStyles({
  background: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: `#f9faff`
  },
  options: {
    padding: spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "330px",
    padding: spacing(2)
  },
  button: {
    color: "white",
    backgroundColor: "#4c47f7",
    height: "40px"
  }
});

export default getDomainStyles;