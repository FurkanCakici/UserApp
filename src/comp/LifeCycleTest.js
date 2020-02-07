import React, { Component } from 'react';

class Test extends Component {
   constructor(props) {
      super(props);
      this.state = {
         a: 10
      };
      console.log('contructer');
   }

   componentDidMount() {
      // Component yerleştirildikten sonra
      console.log('componentDidMount');
      // Api istekleri
      this.setState({
         a: 20
      });
   }

   componentDidUpdate(prevProps, prevState) {
      // Component güncellendikten sonra
      console.log('componentDidupdate');
   }

   shouldComponentUpdate() {
      console.log('shouldComponentUptade');
      return true; // False olduğu zaman update & render çalışmaz
   }

   componentWillUnmount() {
      console.log('componentWillUnmount'); // Component kaldırıldıktan sonra
   }

   render() {
      console.log('render');
      return <div></div>;
   }
}

export default Test;
