import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import styles from "./Favorites.module.css";
import { filterCards, orderCards, reset, deleteFavorites } from "../Redux/actions";

export default function Favorites(props) {
  const dispatch = useDispatch();
  const myFavorites = useSelector((s) => s.myFavorites);
  // console.log("...............", myFavorites);

  function handleClick(e) {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === "filter") {
      return dispatch(filterCards(value));
    }
    if (name === "order") {
      dispatch(orderCards(value));
    }
  }
  function onCloseGral(id) {
    props.onClose(id);
    dispatch(deleteFavorites(id));
  }

  return (
    <>
      <div className={styles.cards}>
        <div>
          <select name="order" defaultValue={"DEFAULT"} onChange={handleClick}>
            <option value="DEFAULT" disabled>
              Select Order
            </option>
            <option value="Ascendente">Ascendente</option>
            <option value="Descendente">Descendente</option>
          </select>
          <select name="filter" defaultValue={"DEFAULT"} onChange={handleClick}>
            <option value="DEFAULT" disabled>
              Select Filter
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Genderless">Genderless</option>
            <option value="unknown">unknown</option>
          </select>
          <div>
            <button onClick={() => dispatch(reset())}>RESET</button>
          </div>
        </div>
        {myFavorites?.map((c) => {
          return (
            <Card
              key={c.id}
              id={c.id}
              name={c.name}
              species={c.species}
              gender={c.gender}
              image={c.image}
              onClose={() => props.onClose(c.id)}
            />
          );
        })}
      </div>
    </>
  );
}
