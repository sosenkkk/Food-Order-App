import { Card } from "@mui/material";
import styles from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";


const AvailableMeals = () => {

    useEffect(()=>{
        const fetchMeals=async()=>{
            const response= await fetch('https://zwiggy-dc710-default-rtdb.firebaseio.com/Meals.json');
            const responseData= await response.json();
            const loadedMeals=[];
            for(const key in responseData){
                loadedMeals.push({
                    id:key,
                    name:responseData[key].Name,
                    description:responseData[key].description,
                    price:responseData[key].price,
                });
            }
            setmeals(loadedMeals);
        };
        fetchMeals();
    }, []);

    const [meals, setmeals] = useState([]);

    const mealsList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} describe={meal.description} price={meal.price} />);

    return <section className={styles.meals} >
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;