// Converts from degrees to radians.
Number.prototype.toRadians = function () {
  return (this * Math.PI) / 180;
};

// Calculates the distance between Grenoble and the given city
function distanceFromGrenoble(city) {
  //console.log("distanceFromGrenoble - implement me !");
  var GrenobleLat = 45.166667;
  var GrenobleLong = 5.716667;

  const R = 6371e3; // mètres
  const φ1 = (GrenobleLat * Math.PI) / 180; // φ, λ en radians
  const φ2 = (city.latitude * Math.PI) / 180;
  const Δφ = ((city.latitude - GrenobleLat) * Math.PI) / 180;
  const Δλ = ((city.longitude - GrenobleLong) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // en mètres
  //console.log(city.nom_commune + " depuis Grenoble : " + d / 1000 + " km");
  return d;
}

// Swap 2 values in array csvData
// i is the index of the first city
// j is the index of the second city
function swap(data, i, j) {
  displayBuffer.push(["swap", i, j]); // Do not delete this line (for display)
  console.log("swap - implement me !");

  let tmp = data[i];
  data[i] = data[j];
  data[j] = tmp;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function isLess(i, j) {
  displayBuffer.push(["compare", i, j]); // Do not delete this line (for display)
  console.log("isLess - implement me !");
  if (csvData[i].dist < csvData[j].dist) return true;
  return false;
}

// Returns true if city with index i in csvData is closer to Grenoble than city with index j
// i is the index of the first city
// j is the index of the second city
function quickIsLess(data, i, j) {
  displayBuffer.push(["compare", i, j]); // Do not delete this line (for display)
  console.log("quickIsLess - implement me !");
  if (data[i].dist < data[j].dist) return true;
  return false;
}

// for each element of the list compare and sort with each element placed after
function insertsort() {
  console.log("insertsort - implement me !");

  let i, j;
  const len = csvData.length;

  for (i = 1; i < len; i++) {
    for (j = i; j > 0 && isLess(j, j - 1); j--) {
      swap(csvData, j, j - 1);
    }
  }
}

// for each element of the list compare and find the min in the rest of list
// swap the min with the element compared if necessary
function selectionsort() {
  console.log("selectionsort - implement me !");
  let i, j;
  const len = csvData.length;

  for (i = 0; i < len - 1; i++) {
    let min = i;
    for (j = i + 1; j < len; j++) {
      if (isLess(j, min)) {
        min = j;
      }
    }
    swap(csvData, i, min);
  }
}

function bubblesort() {
  console.log("bubblesort - implement me !");

  const len = csvData.length;
  let pass = 0;
  let permut = true;
  let i;

  while (permut) {
    permut = false;
    for (i = 0; i < len - 1 - pass; i++) {
      if (isLess(i + 1, i)) {
        swap(csvData, i, i + 1);
        permut = true;
      }
    }
    pass++;
  }
}

function insertsortForShell(gap, start) {
  console.log("insertsort - implement me !");

  let i, j;
  const len = csvData.length;

  for (i = start; i < len; i += gap) {
    for (j = i; j > 0 && isLess(j, j - 1); j--) {
      swap(csvData, j, j - 1);
    }
  }
}

function shellsort() {
  console.log("shellsort - implement me !");
  let gap, start, i, j;
  const len = csvData.length;
  // List of gaps
  //gap define the gap between each element that will define new list to sort
  for (gap = Math.floor(len / 2); gap > 0; gap = Math.floor(gap / 2)) {
    //shift the start pointer
    for (start = 0; start < gap; start++) {
      //sort elements space by gap with insertionsort
      insertsortForShell(gap, start);
    }
  }
}

function merger(left, right) {
  let res = [];
  let il = 0;
  let ir = 0;
  const lenL = left.length;
  const lenR = right.length;

  while (il < lenL && ir < lenR) {
    if (left[il].dist <= right[ir].dist) {
      res.push(left[il]);
      il++;
    } else {
      res.push(right[ir]);
      ir++;
    }
  }
  while (il < lenL) {
    res.push(left[il]);
    il++;
  }
  while (ir < lenR) {
    res.push(right[ir]);
    ir++;
  }

  return res;
}

function mergesort(data) {
  console.log("mergesort - implement me !");

  const len = data.length;
  const half = Math.floor(len / 2);

  console.log(data);
  if (len <= 1) return data;
  let left = data.slice(0, half); // remove elements from 0 to half and replace with nothing -> split the array in two parts left and right
  let right = data.slice(half);
  left = mergesort(left);
  right = mergesort(right);

  return merger(left, right);
}

function heapsort() {
  console.log("heapsort - implement me !");
}

function quicksort() {
  console.log("quicksort - implement me !");

  //csvData = quickSort(csvData);
  //setupDisplay();

  quicksort2(csvData, 0, csvData.length - 1);
}

function quickSort(data) {
  if (data.length <= 1) {
    return data;
  } else {
    let left = [];
    let right = [];
    let newArray = [];
    let pivot = data.pop();
    let len = data.length;

    for (let i = 0; i < len; i++) {
      if (data[i].dist <= pivot.dist) {
        left.push(data[i]);
      } else {
        right.push(data[i]);
      }
    }

    return newArray.concat(quickSort(left), pivot, quickSort(right));
  }
}

function partition(items, left, right) {
  let pivot = items[Math.floor((right + left) / 2)];
  console.log(Math.floor((right + left) / 2));
  let i = left;
  let j = right;

  while (i <= j) {
    while (quickIsLess(items, i, items.indexOf(pivot))) {
      i++;
    }
    while (quickIsLess(items, items.indexOf(pivot), j)) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function quicksort2(items, left, right) {
  let index;
  if (items.length > 1) {
    index = partition(items, left, right);
    if (left < index - 1) {
      console.log("coucou le rappel left");
      quicksort2(items, left, index - 1);
    }
    if (index < right) {
      console.log("coucou le rappel right");
      quicksort2(items, index, right);
    }
  }
  return items;
}

function quick3sort() {
  console.log("quick3sort - implement me !");
}

function sort(algo) {
  switch (algo) {
    case "insert":
      insertsort();
      break;
    case "select":
      selectionsort();
      break;
    case "bubble":
      bubblesort();
      break;
    case "shell":
      shellsort();
      break;
    case "merge":
      csvData = mergesort(csvData);
      setupDisplay();
      break;
    case "heap":
      heapsort();
      break;
    case "quick":
      quicksort();
      break;
    case "quick3":
      quick3sort();
      break;
    default:
      throw "Invalid algorithm " + algo;
  }
}
