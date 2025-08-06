import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 12,
    textAlign: 'center',
    // marginBottom: 10,
  },
  invoiceTitle: {
    fontSize: 14,
    textAlign: 'center',
    textDecoration: 'underline',
    marginVertical: 10,
  },
  section: {
    marginVertical: 10,
    padding: 10,
    border: '1 solid #ccc',
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    marginVertical: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#5a8cdb',
    color: 'white',
    padding: 6,
    fontWeight: 'bold',
    fontSize: 10,
    marginTop: 10,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottom: '1 solid #eee',
    fontSize: 10,
  },
  bankAndTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bankDetails: {
    width: '55%',
    fontSize: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
  },
  totalSection: {
    width: '40%',
    // alignItems: 'flex-end',
    fontSize: 10,
    padding: 10,
    backgroundColor: '#e6f2ff',
    borderRadius: 4,
  },
  rightText: {
    // textAlign: 'right',
  },
});

const MyInvoice = (props) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>BAVAS CAR WASH & POLLUTION CENTRE</Text>
      <Text style={styles.subHeader}>
        TKS Puram , Kottapuram PO, Kodungallur, 9037583733
      </Text>
      <Text style={styles.invoiceTitle}>TAX INVOICE</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Bill to: <Text>{props.customer}</Text></Text>
        <Text style={styles.label}>Invoice No: <Text>{props.invoiceNo || '--'}</Text></Text>
        <Text style={styles.label}>Date: <Text>{props.date}</Text></Text>
      </View>

      <View style={styles.tableHeader}>
        <Text>#</Text>
        <Text>Item</Text>
        <Text>Qty</Text>
        <Text>Price</Text>
      </View>

      {props?.items?.map((item, index) => (
        <View key={index} style={styles.itemRow}>
          <Text>{index + 1}</Text>
          <Text>{item.item}</Text>
          <Text>1</Text>
          <Text>{item.amount.toFixed(2)}</Text>
        </View>
      ))}

      <View style={styles.bankAndTotal}>
        <View style={styles.bankDetails}>
          <Text style={styles.label}>Bank Details</Text>
          <Text>Bank: SOUTH INDIAN BANK, KODUNGALLUR</Text>
          <Text>Account No: 0020073000010434</Text>
          <Text>IFSC Code: SIBL0000020</Text>
          <Text>Holder: BAVAS POLLUTION TESTING CENTRE</Text>
        </View>

        <View style={styles.totalSection}>
          <Text style={styles.rightText}>Total: {props.amount}</Text>
          <Text style={styles.rightText}>
            Payment: {props.received ? 'Received' : 'Not Paid'}
          </Text>
          <Text style={styles.rightText}>Balance: {props.balance}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default MyInvoice;
