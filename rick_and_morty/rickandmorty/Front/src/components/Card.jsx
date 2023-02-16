import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorites, deleteFavorites } from "../Redux/actions";

export default function Card(props) {
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
  const myFavorites = useSelector((s) => s.myFavorites);

  function handleFavorite(ch) {
    if (isFav) {
      setIsFav(false);
      dispatch(deleteFavorites(ch.id));
    } else {
      setIsFav(true);
      dispatch(addFavorites(ch));
    }
  }

  useEffect(() => {
    myFavorites.forEach((ch) => {
      if (ch.id === props.id) {
        setIsFav(true);
      }
    });
  }, [myFavorites]);

  // console.log(props);
  return (
    <div className={styles.card}>
      <div className={styles.upbar_card}>
        {isFav ? (
          <button onClick={() => handleFavorite(props)}>❤️</button>
        ) : (
          <button onClick={() => handleFavorite(props)}>🤍</button>
        )}
        <button className={styles.bttn} onClick={props.onClose}>
          X
        </button>
      </div>
      <div className={styles.txt}>
        <Link className={styles.linki} to={`/detail/${props.id}`}>
          <h2>{props.name}</h2>
          <p>{props.species}</p>
          <p>{props.gender}</p>
          <img src={props.image} alt={props.image} />
        </Link>
      </div>
    </div>
  );
}
