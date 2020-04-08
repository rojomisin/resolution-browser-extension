import React from 'react';
import { WithStyles, withStyles, Paper, Button } from '@material-ui/core';
import styles from '../../styles/resell.style';
import { DomainPageOptions } from './GetDomain';

interface Props extends WithStyles<typeof styles> {
	moveTo: (page: DomainPageOptions) => void;
}
const Resell: React.FC<Props> = ({ classes, moveTo }) => {
	return (
		<Paper className={classes.options}>
			<Button variant="outlined" className={classes.button} onClick={() => moveTo(DomainPageOptions.Giveaway)}>
				Go to free giveaway
			</Button>
		</Paper>
	);
};
export default withStyles(styles)(Resell);
