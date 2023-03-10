import React from 'react';
import Modal from 'react-bootstrap/Modal';
// import { Button } from 'react-bootstrap';
import './CookbookRecipeModal.css';

class CookbookRecipeModal extends React.Component {
  render() {
    return (
      <Modal className='recipeModal'
        size='lg'
        show={this.props.show}
        onHide={this.props.close}
        centered
      >
        <Modal.Header>
          <Modal.Title>{this.props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='recipeModalBody'>
          <img
            style={{
              width: '300px',
            }}
            src={this.props.imageUrl}
            alt={this.props.name}
            title={this.props.name}
          />

          <div className="recipe-modal-ingredients">

            <h2>Ingredients</h2>
            <div className="displayContainer">
              {this.props.comparedIngredients.map((ingredient, i) => (
                <div
                  key={i}
                  className={ingredient.hasIngredient ? 'have-ingredient' : 'missing-ingredient'}
                >
                  <div className="ingredientsStuffContainer">
                    <img
                      style={{
                        width: '2.5rem',
                      }}
                      src={ingredient.imageUrl}
                      alt={ingredient.ingredientName}
                      title={ingredient.ingredientName} />
                    <h5>{ingredient.ingredientName}</h5>
                    <h5>{ingredient.measurement}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="instructions">
            <h2>Instructions</h2>
            <ol>
              {this.props.instructions.map((step, i) => (
                <li key={i + 1}>{step}</li>
              ))}
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer className='recipeModalFooter'>
          <button className='closeButton' onClick={this.props.close}>Close</button>
          <button className='removeButton' onClick={(e) => this.props.deleteCookbookRecipe(e, this.props._id)}>Remove</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default CookbookRecipeModal;
