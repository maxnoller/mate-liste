import React, {Component} from 'react';
import { render } from "react-dom";

class EditButton extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false };
  }

  render() {
    if (this.state.edit) {
      return 'Editing.';
    }

    return (
      <button onClick={() => this.setState({ edit: true })} style="btn-primary">
          Edit
      </button>
    );
  }
}
const domContainer = document.querySelector('#edit_button_container');
ReactDOM.render(EditButton, domContainer);