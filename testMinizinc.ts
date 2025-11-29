import { Model } from "minizinc";

const model = new Model();

model.addJson({ total_flour: 4000, total_sugar: 2000 });
// Add a file with a given name and string contents
model.addFile(
  "test.mzn",
  `
    % Baking cakes for the school fete

    int: total_flour;
    int: total_sugar;

    var 0..100: b; % no. of banana cakes
    var 0..100: c; % no. of chocolate cakes

    % flour
    constraint 250*b + 200*c <= total_flour;
    % bananas
    constraint 2*b  <= 6;
    % sugar
    constraint 75*b + 150*c <= total_sugar;
    % butter
    constraint 100*b + 150*c <= 500;
    % cocoa
    constraint 75*c <= 500;

    % maximize our profit
    solve maximize 400*b + 450*c;

    output ["no. of banana cakes = \\(b)\\n",
          "no. of chocolate cakes = \\(c)\\n"];
  `
);

const solve = model.solve({
  options: {
    solver: "gecode",
    "time-limit": 10000,
    statistics: true,
  },
});

// solve.on("solution", console.log);

console.log(await solve);
