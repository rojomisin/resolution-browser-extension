import React from 'react';
import { WithStyles, withStyles, Paper, Button, Divider, Typography } from '@material-ui/core';
import styles from '../../styles/connect.style';
import { Domain } from './DomainGiveaway';
import { Buffer } from 'buffer';

interface Props extends WithStyles<typeof styles> {
	selectedDomain: Domain;
}
const Connect: React.FC<Props> = ({ classes, selectedDomain }) => {
	const renderDomain = () => {
		const img = selectedDomain.profilePicture;
		const buff = new Buffer(img);
		const data = `data:image/svg+xml;base64,${buff.toString('base64')}`;

		return (
			<>
				<Typography variant="h3" color="primary">
					Claim your domain
				</Typography>
				<img src={data} className={classes.image} />
				<Typography variant="h3">{selectedDomain.domain}</Typography>
				<Divider />
				<Typography variant="body1" style={{marginTop: "16px"}}>
					Enter an Ethereum address that you control the keys to. If you want to manage your domains later on,
					you will need to import your keys into a wallet with web3 support.
				</Typography>
				<div className={classes.controlBox}> Controll room</div>
			</>
		);
	};

	return (
		<div className={classes.background}>
			<Paper className={classes.paper}>{renderDomain()}</Paper>
		</div>
	);
};
export default withStyles(styles)(Connect);
