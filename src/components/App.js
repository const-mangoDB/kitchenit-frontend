import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import About from './About';
import MyCookbook from './MyCookbook';
import MyKitchen from './MyKitchen';
import FilteredRecipes from './FilteredRecipes';
// import { motion as m } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import React from 'react';
import axios from 'axios';
// import { Container } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cookbookRecipes: [],
      kitchenIngredients: [],
    };
    
  }


  componentDidMount() {
    this.getKitchenIngredients();
    this.getCookbook();
  }

  getCookbook = async () => {
    const url = `${process.env.REACT_APP_SERVER}/cookbook`;
    try {
      const response = await axios.get(url);
      this.setState({ cookbookRecipes: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  deleteCookbookRecipe = async (e, id) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_SERVER}/cookbook/${id}`;
    try {
      await axios.delete(url);
      const filteredRecipes = this.state.cookbookRecipes.filter(recipe => recipe._id !== id);
      this.setState({ cookbookRecipes: filteredRecipes });
    } catch (err) {
      console.log(err);
    }
  };

  addRecipeToCookbook = async (e, newRecipe) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_SERVER}/cookbook`;
    try {
      const response = await axios.post(url, newRecipe);
      this.setState({ cookbookRecipes: [...this.state.cookbookRecipes, response.data] });
      /* We need a way to keep track of the id for our FilteredRecipe component. We set state to update the cookbook recipes, but each individual recipe can be added or removed from the cookbook from the FilteredRecipe component. 
      
      To keep track of this, we'll return the id of the created recipe, which will be set in state for each individual filtered recipe which has been added to the cookbook. */
      return response.data._id;
    } catch (err) {
      console.log(err);
    }
  };

  getKitchenIngredients = async () => {
    const url = `${process.env.REACT_APP_SERVER}/ingredients`;
    try {
      const response = await axios.get(url);
      this.setState({ kitchenIngredients: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  addKitchenIngredient = async (newIngredient) => {
    const url = `${process.env.REACT_APP_SERVER}/ingredients`;
    try {
      const response = await axios.post(url, newIngredient);
      this.setState({ kitchenIngredients: [...this.state.kitchenIngredients, response.data] });
    } catch (err) {
      console.log(err);
    }
  };

  deleteKitchenIngredient = async (id) => {
    const url = `${process.env.REACT_APP_SERVER}/ingredients/${id}`;
    try {
      await axios.delete(url);
      const filteredIngredients = this.state.kitchenIngredients.filter(ingredient => ingredient._id !== id);
      this.setState({ kitchenIngredients: filteredIngredients });
    } catch (err) {
      console.log(err);
    }
  };
  

  render() {
    return (
      <>
        <Router>
          <div className="body">
            <Header />
            <AnimatePresence>

              <Routes>
                <Route
                  exact path="/"
                  element={<Main />}
                ></Route>
                {/* </AnimatePresence> */}

                {/* <AnimatePresence> */}
                <Route
                  path={'/myKitchen'}
                  element={<MyKitchen
                    kitchenIngredients={this.state.kitchenIngredients}
                    addKitchenIngredient={this.addKitchenIngredient}
                    deleteKitchenIngredient={this.deleteKitchenIngredient}
                  />}

                ></Route>
                {/* </AnimatePresence> */}

                {/* <AnimatePresence> */}
                <Route
                  path={'/filteredRecipes'}
                  element={<FilteredRecipes
                    kitchenIngredients={this.state.kitchenIngredients}
                    cookbookRecipes={this.state.cookbookRecipes}
                    addRecipeToCookbook={this.addRecipeToCookbook}
                    deleteCookbookRecipe={this.deleteCookbookRecipe}
                  />}
                ></Route>
                {/* </AnimatePresence> */}

                {/* <AnimatePresence> */}
                <Route
                  path={'/myCookbook'}
                  element={<MyCookbook
                    kitchenIngredients={this.state.kitchenIngredients}
                    cookbookRecipes={this.state.cookbookRecipes}
                    deleteCookbookRecipe={this.deleteCookbookRecipe}
                  />}
                ></Route>
                {/* </AnimatePresence> */}


                {/* <AnimatePresence> */}
                <Route
                  path={'/about'}
                  element={<About />}
                ></Route>

              </Routes>
              <Footer />
            </AnimatePresence>
          </div>
        </Router>

      </>
    );
  }
}

export default App;
