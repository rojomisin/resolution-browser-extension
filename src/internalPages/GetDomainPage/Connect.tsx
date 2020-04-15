import React, { useState } from 'react';
import { WithStyles, withStyles, Paper, Button, Divider, Typography, TextField } from '@material-ui/core';
import styles from '../../styles/connect.style';
import { Domain } from './DomainGiveaway';
import { Buffer } from 'buffer';
import { StorageSyncKey, chromeStorageSyncGet } from '../../util/chromeStorageSync';

interface Props extends WithStyles<typeof styles> {
	selectedDomain: Domain;
}
const Connect: React.FC<Props> = ({ classes, selectedDomain }) => {
	const [ owner, setOwner ] = useState('');

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
				<Typography variant="body1" style={{ marginTop: '16px' }}>
					Enter an Ethereum address that you control the keys to. If you want to manage your domains later on,
					you will need to import your keys into a wallet with web3 support.
				</Typography>
			</>
		);
	};

	const checkAddress = (): boolean => {
		console.log(owner);
		return owner && /^(0x)?[0-9a-f]{40}$/i.test(owner);
	};

	const getCode = async (): Promise<string> => {
		let code: string = await chromeStorageSyncGet(StorageSyncKey.DomainGiveAwayCode);
		if (!code) {
			const url = 'https://unstoppabledomains.com/api/admin/giveaway/UE';
			code = await fetch(url, {
				method: 'POST',
				mode: 'no-cors',
				headers: { 'Access-Control-Allow-Origin': 'https://unstoppabledomains.com', "origin": "https://unstoppabledomains.com" }
			})
				.then((res) => res.json())
				.then((json) => json.link);
			console.log('got code = ', code);
		}
		return code;
	};

	const handleNextStep = async () => {
		const code = await getCode();
		console.log('ready to go for the next step ', { owner, selectedDomain, code });
	};

	return (
		<div className={classes.background}>
			<Paper className={classes.paper}>
				{renderDomain()}
				<div className={classes.addressField}>
					<TextField
						id="outlined-basic"
						label="Etherium address"
						variant="outlined"
						value={owner}
						onChange={(e) => setOwner(e.target.value)}
						fullWidth
					/>
				</div>
				<div className={classes.controllBox}>
					{checkAddress() ? (
						<Button fullWidth className={classes.button} onClick={handleNextStep}>
							Continue
						</Button>
					) : (
						<Button fullWidth disabled className={classes.button} onClick={handleNextStep}>
							Continue
						</Button>
					)}
				</div>
			</Paper>
		</div>
	);
};
export default withStyles(styles)(Connect);
