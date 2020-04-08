import React, {useState, useEffect} from 'react';
import { WithStyles, withStyles, Paper, Button, Typography, Divider, CircularProgress } from '@material-ui/core';
import styles from '../../styles/domainGiveaway.style';
import { Buffer } from 'buffer';
import { DomainPageOptions } from './GetDomain';

interface Props extends WithStyles<typeof styles> {
  moveTo: (page: DomainPageOptions) => void,
  setSelectedDomain: React.Dispatch<React.SetStateAction<Domain>>
}

export interface Domain {
  domain: string,
  giveawayType: string,
  profilePicture: string
}

const DomainGiveaway: React.FC<Props> = ({ classes, moveTo , setSelectedDomain}) => {
  const [giveawayDomains, setDomains] = useState<Domain[]>([]);
  const [current, setCurrent] = useState(0);
  
  const giveawayurl = "https://unstoppabledomains.com/api/v1/resellers/UE/domains/giveaway";
  const domainPictureUrl = "https://metadata.unstoppabledomains.com/image";
  const fetchNewDomain = async ():Promise<Domain> => {
    const response = await fetch(giveawayurl).then(res => res.json());
    const {domain, giveawayType} = response.giveaway;
    const profilePicture = await fetch(`${domainPictureUrl}/${domain}`).then(res => res.json());
    console.log(profilePicture);
    const fetched = {domain: domain, giveawayType: giveawayType, profilePicture: profilePicture.image_data};
    console.log(fetched);
    return fetched;
  };

  useEffect(() => {
    const newDomain = fetchNewDomain();
    newDomain.then(domain => setDomains([...giveawayDomains, domain]));
  }, []);

  const handleNext = async () => {
    if (current === giveawayDomains.length - 1) {
      setCurrent(current + 1);
      const newDomain = await fetchNewDomain();
      setDomains([...giveawayDomains, newDomain]);
    }

  }

  const handlePrevious = () => {
    if (current == 0) return ;
    setCurrent(current - 1);
  }

  const navigateToConnect = (domain: Domain) => {
    setSelectedDomain(domain);
    moveTo(DomainPageOptions.Connect);
  }

  const renderDomain = () => {
    const img = giveawayDomains[current].profilePicture;
    const buff = new Buffer(img);
    const data = `data:image/svg+xml;base64,${buff.toString('base64')}`;
  
    return(<>
      <Typography variant="h3" color="primary">Get your free domain</Typography>
      <img src={data} className={classes.image}/>
      <Typography variant="h3">{giveawayDomains[current].domain}</Typography>
      <Divider />
      <div className={classes.controlBox}>
        <Button variant="outlined" className={classes.button} onClick={handlePrevious}>Go back</Button>
        <Button variant="outlined" className={classes.button} style={{width: "230px"}} onClick={() => navigateToConnect(giveawayDomains[current])}>Continue</Button>
        <Button variant="outlined" className={classes.button} onClick={handleNext}>Try Next</Button>
      </div>
    </>
  );
}

	return (
		<Paper className={classes.paper}>
      <div className={classes.main}>
        {giveawayDomains[current] != undefined ?  renderDomain() 
          : <CircularProgress/> }
      </div>
			<div className={classes.row}>
        <Button className={classes.button} onClick={() => moveTo(DomainPageOptions.Resell)} fullWidth>
					Go to buy option
				</Button>
			</div>
		</Paper>
	);
};
export default withStyles(styles)(DomainGiveaway);
