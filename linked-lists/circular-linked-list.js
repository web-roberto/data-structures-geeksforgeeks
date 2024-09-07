// circular linked lists
// https://www.geeksforgeeks.org/circular-linked-list/
class Node {
  constructor(value)
  {
      this.data = value;
      this.next = null;
  }
}

function insertInEmptyList(last, data)
{
  if (last !== null)
      return last;

  // Create a new node
  let newNode = new Node(data);

  // Point newNode to itself
  newNode.next = newNode;

  // Update last to point to the new node
  last = newNode;
  return last;
}


function insertAtBeginning(last, value)
{
    const newNode = new Node(value);

    // If the list is empty, make the new node point to
    // itself and set it as last
    if (last === null) {
        newNode.next = newNode;
        return newNode;
    }

    // Insert the new node at the beginning
    newNode.next = last.next;
    last.next = newNode;

    return last;
}

// Function to insert a node at the end of a circular linked
// list
function insertEnd(tail, value){
  let newNode = new Node(value);
  if (tail === null) {
      // If the list is empty, initialize it with the new
      // node
      tail = newNode;
      newNode.next = newNode;
  }
  else {
      // Insert new node after the current tail and update
      // the tail pointer
      newNode.next = tail.next;
      tail.next = newNode;
      tail = newNode;
  }
  return tail;
}

// Function to insert a node at a specific position in a
// circular linked list
function insertAtPosition(last, data, pos)
{
    if (last === null) {
        // If the list is empty
        if (pos !== 1) {
            console.log("Invalid position!");
            return last;
        }
        // Create a new node and make it point to itself
        let newNode = new Node(data);
        last = newNode;
        last.next = last;
        return last;
    }

    // Create a new node with the given data
    let newNode = new Node(data);

    // curr will point to head initially
    let curr = last.next;

    if (pos === 1) {
        // Insert at the beginning
        newNode.next = curr;
        last.next = newNode;
        return last;
    }

    // Traverse the list to find the insertion point
    for (let i = 1; i < pos - 1; ++i) {
        curr = curr.next;

        // If position is out of bounds
        if (curr === last.next) {
            console.log("Invalid position!");
            return last;
        }
    }

    // Insert the new node at the desired position
    newNode.next = curr.next;
    curr.next = newNode;

    // Update last if the new node is inserted at the end
    if (curr === last)
        last = newNode;

    return last;
}

function deleteFirstNode(last) {
  if (last === null) {
      // If the list is empty
      console.log("List is empty");
      return null;
  }

  let head = last.next;

  if (head === last) {
      // If there is only one node in the list
      last = null;
  } else {
      // More than one node in the list
      last.next = head.next;
  }

  return last;
}
function deleteSpecificNode(last, key) {
  if (last === null) {
      // If the list is empty
      console.log("List is empty, nothing to delete.");
      return null;
  }

  let curr = last.next;
  let prev = last;

  // If the node to be deleted is the only node in the list
  if (curr === last && curr.data === key) {
      last = null;
      return last;
  }

  // If the node to be deleted is the first node
  if (curr.data === key) {
      last.next = curr.next;
      return last;
  }

  // Traverse the list to find the node to be deleted
  while (curr !== last && curr.data !== key) {
      prev = curr;
      curr = curr.next;
  }

  // If the node to be deleted is found
  if (curr.data === key) {
      prev.next = curr.next;
      if (curr === last) {
          last = prev;
      }
  } else {
      // If the node to be deleted is not found
      console.log("Node with data " + key + " not found.");
  }

  return last;
}

function deleteLastNode(last) {
  if (last === null) {
      // If the list is empty
      console.log("List is empty, nothing to delete.");
      return null;
  }
  let head = last.next;

  // If there is only one node in the list
  if (head === last) {
      last = null;
      return last;
  }
  // Traverse the list to find the second last node
  let curr = head;
  while (curr.next !== last) {
      curr = curr.next;
  }
  // Update the second last node's next pointer to point to head
  curr.next = head;
  last = curr;

  return last;
}

function search(last, key){
  if (last === null) {
      // If the list is empty
      return false;
  }

  let head = last.next;
  let curr = head;

  // Traverse the list to find the key
  while (curr !== last) {
      if (curr.data === key) {
          // Key found
          return true;
      }
      curr = curr.next;
  }

  // Check the last node
  if (last.data === key) {
      // Key found
      return true;
  }
  // Key not found
  return false;
}

function printList(last){
  if (last === null)
      return;

  let head = last.next;
  while (true) {
      process.stdout.write(head.data + " ");
      head = head.next;
      if (head === last.next)
          break;
  }
  console.log();
}

// Create circular linked list: 2, 3, 4
let first = new Node(2);
first.next = new Node(3);
first.next.next = new Node(4);

let last = first.next.next;
last.next = first;

console.log("Original list:");
printList(last);

// Search for a specific value
let key = 3;
let found = search(last, key);
if (found) {
  console.log(`Value ${key} found in the list.`);
}
else {
  console.log(`Value ${key} not found in the list.`);
}