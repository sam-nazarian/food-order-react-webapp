import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

// later fetch data from a database
const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true); //loading since the component was created

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-4f104-default-rtdb.firebaseio.com/meals.json');
      const responseData = await response.json();

      // console.log(responseData);
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({ id: key, name: responseData[key].name, description: responseData[key].description, price: responseData[key].price });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals();
  }, []);

  // doesn't get past the code below it since it has a return statement
  if (isLoading) {
    return <section className={classes.spinner}></section>;
  }

  const mealsList = meals.map((meal) => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />); //returns an arr of jsx components

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
