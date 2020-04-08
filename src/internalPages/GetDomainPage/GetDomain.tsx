import React, {useState} from 'react';
import { WithStyles, withStyles, Typography, Paper, Button } from '@material-ui/core';
import styles from '../../styles/getDomain.style';
import Resell from './Resell';
import DomainGiveaway, {Domain} from './DomainGiveaway';
import Connect from './Connect';

interface Props extends WithStyles<typeof styles> {}

export enum DomainPageOptions {
  Giveaway = "giveaway",
  Resell = "resell",
  Connect = "connect",
  Unknown = "unknown"
};


const GetDomain: React.FC<Props> = ({ classes }) => {
  const [pageOption, setPageOption] = useState<DomainPageOptions>(DomainPageOptions.Unknown);
  const [selectedDomain, setSelectedDomain] = useState<Domain>(undefined);

  const moveToResell = () => setPageOption(DomainPageOptions.Resell);
  const moveToGiveaway = () => setPageOption(DomainPageOptions.Giveaway);
  const moveTo = (page: DomainPageOptions) => setPageOption(page);
  

  const renderView = (option: DomainPageOptions) => {
    console.log(option);
    
    switch(option) {
      case DomainPageOptions.Giveaway: 
        return <DomainGiveaway moveTo={moveTo} setSelectedDomain={setSelectedDomain}/>
      case DomainPageOptions.Resell:
        return <Resell moveTo={moveTo}/>
      case DomainPageOptions.Connect:
        return <Connect selectedDomain={selectedDomain}/>
      default:
        return (  <Paper className={classes.options}>
          <Typography> You can get a free domain or buy a specific one</Typography>
          <div className={classes.row}>
            <Button variant="outlined" className={classes.button} onClick={() => moveToGiveaway()}>Free domain</Button>
            <Button variant="outlined" className={classes.button} onClick={() => moveToResell()}>Buy specific domain</Button>
          </div>
        </Paper>);
    }
  }

	return (
    <div className={classes.background}>
      {renderView(pageOption)}
    </div>
  );
};

export default withStyles(styles)(GetDomain);
