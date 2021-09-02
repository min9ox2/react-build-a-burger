import styles from "./Burger.module.css";
import Ingredient from "./Ingredient/Ingredient";

const burger = (props) => {
  let allIngredients = Object.keys(props.ingredient)
    .map(k => {
        return [...Array(props.ingredient[k])].map((_, i) => <Ingredient type={k} key={k + i} />);
    })
    .reduce((arr, current) => {
      return arr.concat(current);
    }, []);

  console.log(allIngredients);

  if (allIngredients.length === 0) {
    allIngredients = <p>Start adding ingredients now!</p>
  }

  return (
    <div className={styles.Burger}>
      <Ingredient type="bread-top" />
      {allIngredients}
      <Ingredient type="bread-bottom" />
    </div>
  );
};

export default burger;
