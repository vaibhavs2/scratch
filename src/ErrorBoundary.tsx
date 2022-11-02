import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

type Props={children:React.ReactNode};
type State={isError:boolean}
export class ErrorBoundary extends React.PureComponent<Props, State>{

    state: Readonly<State>={
        isError:false
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log("got boundary error", error.message)
        this.setState({ isError:true})
    }

    onRestartPress = ()=>{
        this.setState({ isError:false})
    }


    render(): React.ReactNode {
        if(this.state.isError){
            return (<View style={styles.errorContainer}>
                <Text style={styles.errorTitle}>OOPs!, Encountered Error, Restart please</Text>
                <Button title='Restart' onPress={this.onRestartPress} />

            </View>)
        }

        return (this.props.children)
    }

}


const styles = StyleSheet.create({
    errorContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    },
    errorTitle:{
        marginBottom:12
    }
})