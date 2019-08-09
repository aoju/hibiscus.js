import {Component, OnInit} from '@angular/core';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';
import {timer} from 'rxjs/observable/timer';

const treeData = [
    {
      'id': '1',
      'pid': '0',
      'name': '家用电器',
      'icon': 'icmn-checkbox-unchecked',
      'children': [
        {
          'id': '4',
          'pid': '1',
          'name': '大家电',
          'icon': 'icmn-checkbox-unchecked',
          'children': [
            {
              'id': '7',
              'pid': '4',
              'name': '空调',
              'icon': 'icmn-checkbox-unchecked',
              'children': [
                {
                  'id': '15',
                  'pid': '7',
                  'icon': 'icmn-checkbox-unchecked',
                  'name': '海尔空调'
                },
                {
                  'id': '16',
                  'pid': '7',
                  'icon': 'icmn-checkbox-unchecked',
                  'name': '美的空调'
                }
              ]
            },
            {
              'id': '8',
              'pid': '4',
              'icon': 'icmn-checkbox-unchecked',
              'name': '冰箱'
            },
            {
              'id': '9',
              'pid': '4',
              'icon': 'icmn-checkbox-unchecked',
              'name': '洗衣机'
            },
            {
              'id': '10',
              'pid': '4',
              'icon': 'icmn-checkbox-unchecked',
              'name': '热水器'
            }
          ]
        },
        {
          'id': '5',
          'pid': '1',
          'name': '生活电器',
          'icon': 'icmn-checkbox-unchecked',
          'children': [
            {
              'id': '19',
              'pid': '5',
              'icon': 'icmn-checkbox-unchecked',
              'name': '加湿器'
            },
            {
              'id': '20',
              'pid': '5',
              'icon': 'icmn-checkbox-unchecked',
              'name': '电熨斗'
            }
          ]
        }
      ]
    },
    {
      'id': '2',
      'pid': '0',
      'name': '服饰',
      'icon': 'icmn-checkbox-unchecked',
      'children': [
        {
          'id': '13',
          'pid': '2',
          'icon': 'icmn-checkbox-unchecked',
          'name': '男装'
        },
        {
          'id': '14',
          'pid': '2',
          'icon': 'icmn-checkbox-unchecked',
          'name': '女装'
        }
      ]
    },
    {
      'id': '3',
      'pid': '0',
      'name': '化妆',
      'icon': 'icmn-checkbox-unchecked',
      'children': [
        {
          'id': '11',
          'pid': '3',
          'icon': 'icmn-checkbox-unchecked',
          'name': '面部护理'
        },
        {
          'id': '12',
          'pid': '3',
          'icon': 'icmn-checkbox-unchecked',
          'name': '口腔护理'
        }
      ]
    }
  ];

@Component({
  selector: 'hi-tree-view-demo',
  templateUrl: './tree-view-demo.template.html'
})
export class TreeViewDemoComponent implements OnInit {
  treeData1: any;
  treeData2: any;
  treeData3: any;
  treeData4: any;
  treeData5: any;
  lazyLoadTreeData: any;
  treeNodeCount = 500;
  largeNodes: any[];
  largeTreeCheckable: boolean;

  ngOnInit(): void {
    timer(1000 * 1)
      .subscribe(() => {
        this.treeData1 = this.clone(treeData);
        this.treeData2 = this.clone(treeData);
        this.treeData3 = this.clone(treeData);
        this.treeData4 = this.clone(treeData);
        this.treeData5 = this.clone(treeData);
        this.lazyLoadTreeData = [{
          'id': '1',
          'pid': '0',
          'name': 'Lazyload node 1',
        },
          {
            'id': '2',
            'pid': '0',
            'name': 'Lazyload node 2',
          },
          {
            'id': '3',
            'pid': '0',
            'name': 'Lazyload node 3',
          }];
      });

  }

  loadChildren = (parent) => {
    const pid = parent.id;
    console.log(`Load children for parent ${pid}`);
    if (pid.split('-').length > 3) {
      return of([]).delay(5 * 1000);
    }

    return of([
      {
        id: `${pid}-1`,
        name: `Lazyload node ${pid}-1`
      },
      {
        id: `${pid}-2`,
        name: `Lazyload node ${pid}-2`
      },
      {
        id: `${pid}-3`,
        name: `Lazyload node ${pid}-3`
      }
    ])
      .delay(5 * 1000);
  }

  clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  generateTreeData() {
    this.largeNodes = this.dataMaker(this.treeNodeCount);
    console.log('tree data generate finish!');
  }

  clearGenerateTreeData() {
    this.largeNodes = [];
  }

  addNode(node, parentNode) {
    console.log('add node', `node= ${node.name}; parent= ${parentNode && parentNode.name}`);
  }

  removeNode(node, parentNode) {
    console.log('remove node', `node= ${node.name}; parent= ${parentNode && parentNode.name}`);
  }

  private dataMaker(count) {
    const nodes = [];
    let i = 0;
    while (i < count) {
      const node: any = {id: i, name: `node-${i}`};
      node.children = this.generateChildren(i);
      nodes.push(node);
      i = i + 10;
    }

    return nodes;
  }

  private generateChildren(id) {
    return [{
      id: id + 1,
      name: `node-${id + 1}`,
      children: [
        {
          id: id + 2,
          name: `node-${id + 2}`,
          children: [
            {
              id: id + 4,
              name: `node-${id + 4}`
            },
            {
              id: id + 5,
              name: `node-${id + 5}`
            },
            {
              id: id + 6,
              name: `node-${id + 6}`
            }
          ]
        },
        {
          id: id + 3,
          name: `node-${id + 3}`,
          children: [
            {
              id: id + 7,
              name: `node-${id + 7}`
            },
            {
              id: id + 8,
              name: `node-${id + 8}`
            },
            {
              id: id + 9,
              name: `node-${id + 9}`
            }
          ]
        }
      ]
    }];
  }
}
