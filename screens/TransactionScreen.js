import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput,ImageBackground,Image} from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner"; 
import db from "../config";

const bgImage = require("../assets/background2.png");
const appIcon = require("../assets/appIcon.png");
const appName = require("../assets/appName.png");

export default class TransactionScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            domState: "normal",
            hasCameraPermissions: null,
            scanned: false,
            bookId : '',
            studentId: ''
        }
    }

    getCameraPermission = async domState => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
          hasCameraPermissions: status === "granted",
          domState: domState,
          scanned: false
        });
    }

    handleBarcodeScanned = async ({type,data}) => {
      const {domState} = this.state;

      if(domState == "bookId"){
        this.setState({
          bookId: data,
          domState: "normal",
          scanned: true
        });
      }else if(domState == "studentId"){
        this.setState({
          studentId: data,
          domState: "normal",
          scanned: true
        });
      }
    }

    handleTransaction =() =>{
      const {bookId} = this.state;
      db.collection("books")
      .doc("BICY001")
      .get()
      .then(doc => {
        var book = doc.data();
        if(book.book_details.is_book_available){
          this.initiateBookIssue();
        }else{
          this.initiateBookReturn();
        }
      });
    }

    initiateBookIssue = () => {
      console.log("Libro Emitido al alumnno");
    }

    initiateBookReturn = () => {
      console.log("Libro devuelto a la biblioteca");
    }

    render(){
        const {domState, scanned, studentId, bookId, } = this.state;
        
        if(domState !== "normal"){
          return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
            style={StyleSheet.absoluteFill}
          />);
        }

        return(
          <View style={styles.container}>
            <ImageBackground
            source={bgImage}
            style={styles.bgImage}
            >
              <View style={styles.upperContainer}>
                <Image source={appIcon} style={styles.appIcon}/>
                <Image source={appName} style={styles.appName}/>
              </View>
              <View style={styles.lowerContainer}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={" Id del libro"}
                    placeholderTextColor={"#FFFFFF"}
                    value={bookId}
                    />
                  <TouchableOpacity 
                    style={styles.scannButtom}
                    onPress={()=>{
                      this.getCameraPermission("bookId");
                    }}>
                      <Text style={styles.text}>Escanear</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={[styles.textInputContainer, {marginTop: 25}]}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={" Id del alumno"}
                    placeholderTextColor={"#FFFFFF"}
                    value={studentId}
                    />
                  <TouchableOpacity 
                    style={styles.scannButtom}
                    onPress={()=>{
                      this.getCameraPermission("studentId");
                    }}>
                      <Text style={styles.text}>Escanear</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.handleTransaction}>
                  <Text style={styles.buttonText}>Enviar</Text>
                </TouchableOpacity>
              </View>          
            </ImageBackground>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#5653D4"
    },
    lowerContainer: {
      flex: 0.5,
      alignItems: "center",
    },
    text: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    scannButtom: {
      height: 50,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
      textAlign: 'center',
      borderColor: "white",
      backgroundColor: '#9DFD24',
      borderTopRightRadius:10,
      borderBottomRightRadius: 10
    },
    textInput: {
      borderWidth: 3,
      borderColor: "white",
      borderRadius: 10,
      padding: 10,
      width: "57%",
      height: 50,
      color: "white",
      backgroundColor: "#5653D4",
      fontFamily:"Rajdhani_600SemiBold",
      fontSize: 18,
    },
    textInputContainer: {
      flexDirection:"row",
      borderWidth:2,
      borderColor:"white",
      borderRadius: 10,
      backgroundColor: '#9DFD24',
    },
    bgImage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
    upperContainer:{
      flex:0.5,
      justifyContent: "center",
      alignItems: "center"
    },
    appIcon:{
      width: 200,
      height:200,
      resizeMode:"contain",
      marginTop: 80
    },
    appName:{
      width: 80,
      height: 80,
      resizeMode: "contain"
    },
    button: {
      width:"43%",
      height: 55,
      justifyContent:"center",
      alignItems: "center",
      backgroundColor: "#F48D20",
      borderRadius: 15,
      marginTop: 25
    },
    buttonText: {
      fontFamily:"Rajdhani_600SemiBold",
      color: "#FFFFFF"
    }
  });