class DoubleLinkedList {
    constructor() {
        this.size = 0;
        this.first = null;
        this.last = null;
        for (let i = 0; i < arguments.length; i++) {
            this.append(arguments[i]);
        }
    }

    append(x) {
        if (x instanceof DoubleLinkedListNode) x = x.value;
        let newNode = new DoubleLinkedListNode(x);
        newNode.owner = this;
        if (this.first === null) {
            this.first = newNode;
            this.last = this.first;
        } else {
            this.last.next = newNode;
            newNode.prev = this.last;
            this.last = newNode;
        }
        this.size++;
        return newNode;
    }

    appendLeft(x) {
        if (x instanceof DoubleLinkedListNode) x = x.value;
        let newNode = new DoubleLinkedListNode(x);
        newNode.owner = this;
        if (this.first === null) {
            this.first = newNode;
            this.last = this.first;
        } else {
            newNode.next = this.first;
            this.first.prev = newNode;
            this.first = newNode;
        }
        this.size++;
        return newNode;
    }

    appendRight(x) {
        return this.append(x);
    }

    appendNode(x) {
        if (!x instanceof DoubleLinkedListNode) throw new Error("Type mismatch: appendNode expected a DoubleLinkedListNode");
        if (x.owner !== null) throw new Error("The node to add should not belong to a list");
        x.owner = this;
        if (this.first === null) {
            this.first = x;
            this.last = this.first;
        } else {
            this.last.next = x;
            x.prev = this.last;
            this.last = x;
        }
        this.size++;
        return x;
    }

    appendNodeLeft(x) {
        if (!x instanceof DoubleLinkedListNode) throw new Error("Type mismatch: appendNode expected a DoubleLinkedListNode");
        if (x.owner !== null) throw new Error("The node to add should not belong to a list");
        x.owner = this;
        if (this.first == null) {
            this.first = x;
            this.last = this.first;
            x.prev = null;
            x.next = null;
        } else {
            x.next = this.first;
            this.first.prev = x;
            this.first = x;
        }
        this.size++;
        return x;
    }

    clear() {
        this.size = 0;
        let n = this.first;
        while (n !== null) {
            n.owner = null;
            n = n.next;
        }
        this.first = null;
        this.last = null;
    }

    extend(itr) {
        if (itr instanceof DoubleLinkedList) {
            let n = itr.first;
            while (n !== null) {
                this.append(n);
                n = n.next;
            }
        } else if (Array.isArray(itr)) {
            itr.forEach(item => {
                this.append(item);
            });
        } else {
            throw new Error("Type mismatch: extend expected a DoubleLinkedList or an array");
        }
    }

    extendRight(itr) {
        this.extend(itr);
    }

    extendLeft(itr) {
        if (itr instanceof DoubleLinkedList) {
            let n = itr.last;
            while (n !== null) {
                this.appendLeft(n);
                n = n.prev;
            }
        } else if (Array.isArray(itr)) {
            for (let i = itr.length - 1; i > -1; i--) {
                let item = itr[i]
                this.appendLeft(item);
            }
        } else {
            throw new Error("Type mismatch: extendLeft expected a DoubleLinkedList or an array");
        }
    }

    insert(x, before) {
        if (!before) {
            return this.append(x);
        } else {
            return this.insertBefore(x, before);
        }
    }

    insertAfter(x, ref) {
        if (x instanceof DoubleLinkedListNode) x = x.value;
        if (!ref instanceof DoubleLinkedListNode) throw new Error("Type mismatch: ref should be a DoubleLinkedListNode");
        if (ref.owner !== this) throw new Error("ref should belong to the list");
        if (ref === this.last) return this.append(x);
        let newNode = new DoubleLinkedListNode(x);
        newNode.owner = this;
        let na = ref.next;
        newNode.prev = ref;
        ref.next = newNode;
        newNode.next = na;
        na.prev = newNode;
        this.size++;
        return newNode;
    }

    insertBefore(x, ref) {
        if (x instanceof DoubleLinkedListNode) x = x.value;
        if (!ref instanceof DoubleLinkedListNode) throw new Error("Type mismatch: ref should be a DoubleLinkedListNode");
        if (ref.owner !== this) throw new Error("ref should belong to the list");
        if (ref === this.first) return this.appendLeft(x);
        let newNode = new DoubleLinkedListNode(x);
        newNode.owner = this;
        let pb = ref.prev;
        pb.next = newNode;
        newNode.prev = pb;
        newNode.next = ref;
        ref.prev = newNode;
        this.size++;
        return newNode;
    }

    insertNode(node, before) {
        if (!before) {
            return this.appendNode(node);
        } else {
            return this.insertNodeBefore(node, before);
        }
    }

    insertNodeAfter(node, ref) {
        if (!node instanceof DoubleLinkedListNode) throw new Error("Type mismatch: insertNode expected a DoubleLinkedListNode");
        if (node.owner !== null) throw new Error("Node to insert should not belong to a list");
        if (ref === this.last) return this.appendNode(node);
        node.owner = this;
        let na = ref.next;
        node.prev = ref;
        ref.next = node;
        node.next = na;
        na.prev = node;
        this.size++;
        return node;
    }

    insertNodeBefore(node, ref) {
        if (!node instanceof DoubleLinkedListNode) throw new Error("Type mismatch: insertNode expected a DoubleLinkedListNode");
        if (node.owner !== null) throw new Error("Node to insert should not belong to a list");
        if (ref === this.first) return this.appendNodeLeft(node);
        node.owner = this;
        let pb = ref.prev;
        pb.next = node;
        node.prev = pb;
        node.next = ref;
        ref.prev = node;
        this.size++;
        return node;
    }

    *iter() {
        let n = this.first;
        let re;
        while (n !== null) {
            re = n;
            n = n.next;
            yield re.value;
        }
    }

    *iterNodes() {
        let n = this.first;
        let re;
        while (n !== null) {
            re = n;
            n = n.next;
            yield re;
        }
    }

    *iterValues() {
        let n = this.first;
        let re;
        while (n !== null) {
            re = n;
            n = n.next;
            yield re.value;
        }
    }

    nodeAt(index) {
        if (!Number.isInteger(index)) throw new Error("index should be an integer");
        if (Math.abs(index) > this.size - 1) throw new Error("index out of range");
        if (index === 0) return this.first;
        if (index === this.size - 1) return this.last;
        if (index > 0) {
            let n = this.first;
            let c = 0;
            while (c < index) {
                n = n.next;
                c++;
            }
            return n;
        } else {
            index *= -1;
            let n = this.last;
            let c = 0;
            while (c < index) {
                n = n.prev;
                c++;
            }
            return n;
        }
    }

    pop() {
        return this.popRight();
    }

    popLeft() {
        if (this.size < 1) throw new Error("list is empty");
        let n = this.first;
        n.owner = null;
        let r = n.value;
        if (n.next !== null) n.next.prev = null;
        this.first = n.next;
        this.size--;
        return r;
    }

    popRight() {
        if (this.size < 1) throw new Error("list is empty");
        let n = this.last;
        n.owner = null;
        let r = n.value;
        if (n.prev !== null) n.prev.next = null;
        this.last = n.prev;
        this.size--;
        return r;
    }

    remove(node) {
        if (!node instanceof DoubleLinkedList) throw new Error("Type mismatch: node should be a DoubleLinkedListNode");
        if (this.size < 1) throw new Error("the list is empty");
        if (node.owner !== this) throw new Error("node should belong to the list");
        node.owner = null;
        if (node === this.first) {
            return this.popLeft();
        }
        if (node === this.last) {
            return this.pop();
        }
        let r = node.value;
        let p = node.prev;
        let n = node.next;
        node.prev.next = n;
        node.next.prev = p;
        this.size--;
        return r;
    }

    rotate(n) {
        if (!Number.isInteger(n)) throw new Error("n should be an integer");
        if (n === 0) return;
        let nMod = Math.abs(n) % this.size;
        if (nMod === 0) return;
        let splitIndex;
        if (n > 0) {
            splitIndex = this.size - nMod;
        } else {
            splitIndex = nMod;
        }
        let nl = this.nodeAt(splitIndex - 1);
        if (nl !== null) {
            let nf = nl.next;
            this.first.prev = this.last;
            this.last.next = this.first;
            nf.prev = null;
            nl.next = null;
            this.first = nf;
            this.last = nl;
        } else throw new Error("invalid n");
    }

    toArray() {
        let res = [];
        let n = this.first;
        while (n !== null) {
            res.push(n.value);
            n = n.next;
        }
        return res;
    }

    _printList() {
        let str = "Size:";
        str += this.size;
        str += " {";
        let n = this.first;
        while (n !== null) {
            str += ` ${n.value} <-->`;
            n = n.next;
        }
        if (this.size > 0) str = str.slice(0, str.length - 4);
        str += " } ";
        return str;
    }
}