var arr = [],
  start_index = [],
  end_index = [],
  part_index = [];
var before_part = [];
var after_part = [];
var before_matrix = [],
  after_matrix = [];
var size;
var i, j, x;
var arobj = document.getElementById("demo2");
var str1 = "";
var perc_arr = [],
  p = [],
  Q = [];
var perc_matrix = [],
  green_matrix = [];
var main_str = "",
  sub_str1 = "",
  sub_str2 = "";
var snapshot_matrix = [],
  green_stack = [],
  halfgreen_matrix = [];

function abc() {
  document.querySelector(".btn").style.display = "none";
  size = document.getElementById("demo1").value;
  for (i = 0; i < size - 1; i++) {
    arr.push(Math.ceil(Math.random() * 99));
    str1 += "<div class='grid-item'>" + arr[i] + "</div>";
  }
  arr.push(Math.ceil(Math.random() * 99));
  str1 +=
    "<div class='grid-item' style='border-right: 3px solid black; background-color: rgb(153, 255, 153);'>" +
    arr[i] +
    "</div>";
  arobj.innerHTML = str1;
  str1 = "";
  perc_arr.push(0);
  perc_arr.push(size - 1);
  perc_arr.push("left");
  perc_arr.push(100);
  perc_matrix.push(perc_arr);
  perc_arr = [];
  quickSort(0, size - 1);
  f1();
  f2();
  document.getElementById("demo3").style.display = "inline-block";
}

function abc2() {
  for (i = 0; i < size - 1; i++) {
    if (i == part_index[0])
      str1 +=
        "<div style='background-color: rgb(153, 255, 153);' class='after-item' >" +
        after_matrix[0][i] +
        "</div>";
    else str1 += "<div class='after-item' >" + after_matrix[0][i] + "</div>";
  }
  if (i == part_index[0])
    str1 +=
      "<div class='after-item' style='border-right: 3px solid black; background-color: rgb(153,255,153);'>" +
      after_matrix[0][i] +
      "</div>";
  else
    str1 +=
      "<div class='after-item' style='border-right: 3px solid black;'>" +
      after_matrix[0][i] +
      "</div>";

  document.getElementById("demo5").innerHTML = snapshot_matrix[1];
  document.getElementById("demo4").style.display = "inline-block";
  document.getElementById("demo7").style.display = "inline-block";
  document.getElementById("demo9").style.display = "inline-block";
  document.getElementById("demo6").style.display = "inline-block";
}

main_str = "";

function quickSort(low, high) {
  if (low < high) {
    var pi = partition(low, high);
    part_index.push(pi);
    start_index.push(low);
    end_index.push(high);
    if (high - low >= 4) {
      f3(low, high, pi);
    }
    f(pi, low, high);
    quickSort(low, pi - 1);
    quickSort(pi + 1, high);
  }
}

function partition(low, high) {
  var pivot = arr[high],
    temp;
  var i = low - 1;

  for (var j = low; j <= high - 1; j++) {
    before_part.push(arr[j]);
    if (arr[j] < pivot) {
      i++;
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  before_part.push(arr[high]);
  temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  for (var j = low; j <= high; j++) after_part.push(arr[j]);

  before_matrix.push(before_part);
  before_part = [];
  after_matrix.push(after_part);
  after_part = [];
  return i + 1;
}

function f(pi, low, high) {
  if (!(pi == low + 1 && pi == high - 1)) {
    if ((pi == low || pi == low + 1) && high - low != 1) {
      perc_arr.push(pi + 1);
      perc_arr.push(high);
      perc_arr.push("right");
      perc_arr.push(80);
      perc_matrix.push(perc_arr);
      perc_arr = [];
    } else if ((pi == high || pi == high - 1) && high - low != 1) {
      perc_arr.push(low);
      perc_arr.push(pi - 1);
      perc_arr.push("left");
      perc_arr.push(80);
      perc_matrix.push(perc_arr);
      perc_arr = [];
    } else if (high - low != 1) {
      var wid = 100 * ((pi - low) / (high - low));
      wid--;
      wid = Math.ceil(wid);
      perc_arr.push(low);
      perc_arr.push(pi - 1);
      perc_arr.push("left");
      perc_arr.push(wid);
      perc_matrix.push(perc_arr);
      perc_arr = [];
      perc_arr.push(pi + 1);
      perc_arr.push(high);
      perc_arr.push("right");
      perc_arr.push(100 - wid);
      perc_matrix.push(perc_arr);
      perc_arr = [];
    }
  }
}

function f3(low, high, pi) {
  if (Q.length == 0) {
    p.push(low);
    p.push(high);
    p.push(-1);
    Q.push(p);
    p = [];
  }
  for (i = 0; i < Q.length; i++) {
    if (low == Q[i][0] && high == Q[i][1]) {
      if (pi - low >= 2 && high - pi >= 2) {
        Q[i][2] = pi;
        p.push(low);
        p.push(pi - 1);
        p.push(-1);
        Q.splice(i + 1, 0, p);
        p = [];
        p.push(pi + 1);
        p.push(high);
        p.push(-1);
        Q.splice(i, 0, p);
        p = [];
        break;
      } else {
        if (low == pi || pi == low + 1) {
          Q[i][0] = pi + 1;
          break;
        } else if (high == pi || pi == high - 1) {
          Q[i][1] = pi - 1;
          break;
        }
      }
    }
  }
}

function f1() {
  for (i = 0; i < Q.length; i++) {
    if (Q[i][2] == -1) {
      Q.splice(i, 1);
    }
  }

  for (i = 0; i < before_matrix.length; i++) {
    for (var x = 0; x < perc_matrix.length; x++) {
      if (
        start_index[i] == perc_matrix[x][0] &&
        end_index[i] == perc_matrix[x][1]
      ) {
        sub_str1 =
          "<div style='float:" +
          perc_matrix[x][2] +
          "; width:" +
          perc_matrix[x][3] +
          "% ;'>";
        break;
      }
    }
    main_str = sub_str1;
    for (j = 0; j < before_matrix[i].length - 1; j++)
      main_str += "<div class='grid-item' >" + before_matrix[i][j] + "</div>";
    main_str +=
      "<div class='grid-item' style='border-right: 3px solid black; background-color: rgb(153, 255, 153);'>" +
      before_matrix[i][j] +
      "</div>";
    before_matrix[i] = main_str;

    main_str = sub_str1;
    if (
      part_index[i] - start_index[i] >= 2 &&
      end_index[i] - part_index[i] >= 2
    ) {
      for (j = start_index[i]; j <= part_index[i]; j++) {
        main_str +=
          "<div class='grid-item' style='background-color: rgb(153, 255, 153); '>" +
          arr[j] +
          "</div>";
      }
      for (j = 0; j < start_index.length; j++) {
        if (
          part_index[i] + 1 == start_index[j] &&
          end_index[i] == end_index[j]
        ) {
          for (x = 0; x < before_matrix[j].length - 1; x++)
            main_str +=
              "<div class='grid-item'>" + before_matrix[j][x] + "</div>";
          main_str +=
            "<div class='grid-item' style='border-right: 3px solid black; '>" +
            before_matrix[j][x] +
            "</div>";
        }
      }
      for (j = 0; j < Q.length; j++) {
        if (Q[j][0] == start_index[i] && Q[j][1] == end_index[i]) {
          halfgreen_matrix[j] = main_str;
        }
      }
    }

    main_str = sub_str1;
    for (j = 0; j < after_matrix[i].length - 1; j++) {
      if (j + start_index[i] == part_index[i])
        main_str +=
          "<div class='after-item' style='background-color: rgb(153,255,153);'>" +
          after_matrix[i][j] +
          "</div>";
      else
        main_str += "<div class='after-item'>" + after_matrix[i][j] + "</div>";
    }

    if (j + start_index[i] == part_index[i])
      main_str +=
        "<div class='after-item' style='border-right: 3px solid black; background-color: rgb(153,255,153);'>" +
        after_matrix[i][j] +
        "</div>";
    else
      main_str +=
        "<div class='after-item' style='border-right: 3px solid black;'>" +
        after_matrix[i][j] +
        "</div>";
    after_matrix[i] = main_str;

    main_str = sub_str1;
    for (j = start_index[i]; j < end_index[i]; j++)
      main_str +=
        "<div class='grid-item' style='background-color: rgb(153, 255, 153);'>" +
        arr[j] +
        "</div>";
    main_str +=
      "<div class='grid-item' style='border-right: 3px solid black; background-color: rgb(153, 255, 153); '>" +
      arr[j] +
      "</div>";
    green_matrix.push(main_str);
  }
}

var green = 0;
function f2() {
  i = 0;
  while (i < after_matrix.length) {
    if (
      i != 0 &&
      start_index[i] !== start_index[i - 1] &&
      end_index[i] !== end_index[i - 1]
    ) {
      green = 1;
      for (j = 0; j < i; j++) {
        if (end_index[j] + 2 == start_index[i]) break;
      }
      for (x = i - 1; x >= j; x--) {
        snapshot_matrix.push(green_stack.pop());
        start_index.splice(x, 1);
        end_index.splice(x, 1);
        before_matrix.splice(x, 1);
        after_matrix.splice(x, 1);
        green_matrix.splice(x, 1);
      }
      i = x + 1;
    }
    main_str = "";
    if (green == 1) {
      for (j = 0; j < i - 1; j++) main_str += after_matrix[j] + "<br><br><br>";
      after_matrix[j] = halfgreen_matrix.pop();
      snapshot_matrix.push(main_str + after_matrix[j]);
      green = 0;
    }
    main_str = "";
    for (j = 0; j < i; j++) main_str += after_matrix[j] + "<br><br><br>";
    snapshot_matrix.push(main_str + before_matrix[i]);
    snapshot_matrix.push(main_str + after_matrix[i]);
    green_stack.push(main_str + green_matrix[i]);
    i++;
  }
  i = 0;
  while (1) {
    if (green_stack.length == 0) break;
    snapshot_matrix.push(green_stack.pop());
    i++;
  }
}

var z = -1;
function main() {
  document.getElementById("demo7").value = "Next";
  if (z <= snapshot_matrix.length - 2) {
    z++;
    document.getElementById("demo8").innerHTML = snapshot_matrix[z];
  }
}

function main2() {
  document.getElementById("demo10").innerHTML = Q;
  document.getElementById("demo11").innerHTML = halfgreen_matrix;
  if (z >= 1) {
    z--;
    document.getElementById("demo8").innerHTML = snapshot_matrix[z];
  }
}
