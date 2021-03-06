import React, {useEffect, useState} from "react";
import * as firebase from 'firebase';
import { FirebaseConnect } from '../../FirebaseConnect';
import PropTypes from "prop-types";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Title from "../Title/Title";
import DateAndTime from "../DateAndTime/DateAndTime";
import { format } from 'date-fns'


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

const Order = (props) => {
  const classes = useStyles();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const connectData = firebase.database().ref('order');
    connectData.on('value', (data) => {
      console.log(data.val());
      const arr = [];
      data.forEach((e) => {
        arr.push({
          id: e.key,
          firthname: e.val().firthname,
      lastname: e.val().lastname,
      email: e.val().email,
      phone: e.val().phone,
      address: e.val().address,
      quan: e.val().quan,
      tp: e.val().tp,
      phuong: e.val().phuong,
      typebuy: e.val().typebuy,
      product: e.val().product,
      date: e.val().date,
      dateto: e.val().dateto,
        });
      });
      setOrder(arr);
    });
  }, []);
  const deleteContact = (id)=>{
    const connectData = firebase.database().ref("order");
    connectData.child(id).remove();
  }
  return (
    <>
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <React.Fragment>
          <Title>Recent Orders Products</Title>
          <Table size="small">
            <TableHead>
              <TableRow style={{backgroundColor: "gray"}}>
                <TableCell>Date</TableCell>
                <TableCell>Date To</TableCell>
                <TableCell>Type Buy</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Ward</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Name product</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((value) => {
                if (value.product.type=="sp") {
                  return(
                    <TableRow key={value.id}>
                    <TableCell><DateAndTime date = {value.date}/></TableCell>
                    <TableCell>{format(new Date(value.dateto), 'dd/MM/yyyy HH:mm')}</TableCell>
                    <TableCell>{value.typebuy}</TableCell>
                    <TableCell>{value.lastname}</TableCell>
                    <TableCell>{value.phone}</TableCell>
                    <TableCell>{value.address}</TableCell>
                    <TableCell>{value.phuong}</TableCell>
                    <TableCell>{value.quan}</TableCell>
                    <TableCell>{value.product.name}</TableCell>
                    <TableCell align="right">{value.product.price}</TableCell>
                    <TableCell><button type="button" class="btn btn-danger" onClick={()=>{deleteContact(value.id)}}>Xóa</button></TableCell>
                  </TableRow>
                  )
                }
              })}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
          </div>
        </React.Fragment>
      </Paper>
    </Grid>
    <Grid item xs={12}>
<Paper className={classes.paper}>        
{/* dịch vụ */}
<React.Fragment>
    <Title>Recent Orders Services</Title>
    <Table size="small">
      <TableHead>
        <TableRow style={{backgroundColor: "gray"}}>
          <TableCell>Date</TableCell>
          <TableCell>Date To</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Ward</TableCell>
          <TableCell>District</TableCell>
          <TableCell>Name product</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {order.map((value) => {
          if (value.product.type=="service") {
            return(
              <TableRow key={value.id}>
              <TableCell><DateAndTime date = {value.date}/></TableCell>
              <TableCell>{format(new Date(value.dateto), 'dd/MM/yyyy HH:mm')}</TableCell>
              <TableCell>{value.lastname}</TableCell>
              <TableCell>{value.phone}</TableCell>
              <TableCell>{value.address}</TableCell>
              <TableCell>{value.phuong}</TableCell>
              <TableCell>{value.quan}</TableCell>
              <TableCell>{value.product.name}</TableCell>
              <TableCell align="right">{value.product.price}</TableCell>
              <TableCell><button type="button" class="btn btn-danger" onClick={()=>{deleteContact(value.id)}}>Xóa</button></TableCell>
            </TableRow>
            )
          }
        })}
      </TableBody>
    </Table>
    <div className={classes.seeMore}>
    </div>
  </React.Fragment>
  </Paper>
  </Grid>
  </>
  );
};

Order.propTypes = {};

export default Order;
