import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin'; 
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import NearMeIcon from '@material-ui/icons/NearMe';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function PaymentMethodSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    props.setSelected(event,newValue)
  };

    <Paper className={classes.root}>
    </Paper>
  return (
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon tabs example"
      >
        <Tab icon={<NearMeIcon />} label="upi" value="upi" />
        <Tab icon={<CreditCardIcon />} label="card" value="card" />
        <Tab icon={<AccountBalanceIcon />} label="bank" value="netbanking" />
        <Tab icon={<AccountBalanceWalletIcon />} label="wallet" value="wallet" />
        <Tab icon={<LocalShippingIcon />} label="cod" value="cod" />
      </Tabs>
  );
}
