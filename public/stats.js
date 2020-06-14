// get all workout data from back-end

fetch("/api/workouts/range")
.then(response => {
  return response.json();
})
.then(data => {
  populateChart(data);
});

API.getWorkoutsInRange()

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600"
  ]

  return arr;
}

function populateChart(data) {
  let workouts = workoutNames(data);
  let durations = duration(data, workouts);
  let kilos = calculateTotalWeight(data, workouts);
  const colors = generatePalette();

  let line = document.querySelector("#canvas").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      title: {
        display: true
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true
            }
          }
        ]
      }
    }
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          label: "Kilos",
          data: kilos,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Kilos Lifted"
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: kilos
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed"
      }
    }
  });
}

function duration(data, workouts) {
  let durations = [];

  workouts.forEach(workout => {
    let uniqueWorkout = workout;
    let exerciseDuration = 0;
    for (let i = 0; i < data.length; i++) {
      let { exercises } = data[i];
      for (let i = 0; i < exercises.length; i++) {
        exercises.forEach(exercise => {
          if (exercise.name === uniqueWorkout) {
            exerciseDuration += exercise.duration;
          }
        });
      }
    }
    durations.push(exerciseDuration);
  });
  return durations;
}

function calculateTotalWeight(data, workouts) {
  let totalWeight = [];

  workouts.forEach(workout => {
    let uniqueWorkout = workout;
    let subTotalWeight = 0;
    for (let i = 0; i < data.length; i++) {
      let { exercises } = data[i];
      for (let i = 0; i < exercises.length; i++) {
        exercises.forEach(exercise => {
          if (
            exercise.name === uniqueWorkout &&
            exercise.type === "resistance"
          ) {
            subTotalWeight += exercise.weight;
          }
        });
      }
    }
    totalWeight.push(subTotalWeight);
  });
  return totalWeight;
}

function workoutNames(data) {
  let workouts = [];

  data.forEach(workout => {
    workout.exercises.forEach(exercise => {
      workouts.push(exercise.name);
    });
  });
  
  const uniqueWorkouts = new Set(workouts);
  const uniqueWorkoutsArray = [...uniqueWorkouts];
  return uniqueWorkoutsArray;
}
