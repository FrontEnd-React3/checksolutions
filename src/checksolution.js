import * as React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class Checksolution extends React.Component {
  state = {
    items: [
      {
        name: "frontend",
        lastminute: true
      },
      {
        name: "backend",
        lastminute: false
      },
      {
        name: "Csharp",
        lastminute: true
      },
      {
        name: "JAVA",
        lastminute: false
      },
      {
        name: "security",
        lastminute: false
      }
    ],
    filters: {
      frontend: false,
      backend: false,
      Csharp: false,
      JAVA: false,
      security: false
    },
    filteredItems: []
  };

  // Using syntax: someFunc = (params) => { ... }   ???where
  // To avoid having to bind(this) in constructor
  onChange = evt => {
    // const is like var and let but doesn't change
    // We need to capture anything dependent on
    //  evt.target in synchronous code, and
    //  and setState below is asynchronous
    const name = evt.target.name;
    const checked = evt.target.checked;

    // Passing function instead of object to setState   ???which one?
    // This is the recommended way if
    //    new state depends on existing state
    this.setState(prevState => {
      // We create a new object for filters
      const filters = {
        //  We add all existing filters
        //  This adds them with their existing values
        ...prevState.filters,
        // This is like:
        //    filters[name] = checked
        // which just overrides the value of
        //    the prop that has the name of checkbox
        [name]: checked
      };

      // Object.keys() will return ["frontend", "backend"]
      // But make sure that "filters" in
      //    our initial state has all values
      const activeFilterNames = Object.keys(filters).filter(
        // We then filter this list to only the ones that
        //    have their value set to true
        //    (meaning: checked)
        // We set this in the `const filter =` part above
        filterName => filters[filterName]
      );

      // We get the full list of items
      // (Make sure it's set in initial state)
      // Then we filter it to match only checked
      const filteredItems = prevState.items.filter(item =>
        // For each item, we loop over
        //     all checked filters
        // some() means: return true if any of the
        //    array elements in `activeFilterNames`
        //    matches the condition
        activeFilterNames.some(
          // The condition is simply the filter name is
          //    the same as the item name
          activeFilterName => activeFilterName === item.name
        )
      );

      // The object returned from setState function
      //    is what we want to change in the state
      return {
        // this is the same as
        // { filter: filters,
        //    filteredItems: filteredItems }
        // Just taking advantage of how const names
        //    are the same as prop names
        filters,
        filteredItems
      };
    });
  };

  renderCheckboxes() {
    return Object.keys(this.state.filters).map((name, index) => {
      return (
        <label key={index}>
          <input
            onChange={this.onChange}
            type="checkbox"
            checked={this.state.filters[name]}
            name={name}
          />
          {name}
        </label>
      );
    });
  }

  render() {
    const items = this.state.filteredItems.length
      ? this.state.filteredItems
      : this.state.items;
    return (
      <div>
        <div>{this.renderCheckboxes()}</div>
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name}
              {item.lastminute && " (lastminute)"}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Checksolution;
