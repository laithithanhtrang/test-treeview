import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as go from 'gojs';
import { DiagramComponent } from 'gojs-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit {
  name = 'Angular';

  @ViewChild(DiagramComponent, { static: false }) diagramComponent: DiagramComponent;

  // familyData = [
  //   { key: 0, name: 'George V', gender: 'M', birthYear: '1865', deathYear: '1936', reign: '1910-1936' },
  //   { key: 1, parent: 0, name: 'Edward VIII', gender: 'M', birthYear: '1894', deathYear: '1972', reign: '1936' },
  //   { key: 2, parent: 0, name: 'George VI', gender: 'M', birthYear: '1895', deathYear: '1952', reign: '1936-1952' },
  //   { key: 7, parent: 2, name: 'Elizabeth II', gender: 'F', birthYear: '1926', reign: '1952-' },
  //   { key: 16, parent: 7, name: 'Charles, Prince of Wales', gender: 'M', birthYear: '1948' },
  //   { key: 38, parent: 16, name: 'Prince William', gender: 'M', birthYear: '1982' },
  //   { key: 39, parent: 16, name: 'Prince Harry of Wales', gender: 'M', birthYear: '1984' },
  //   { key: 17, parent: 7, name: 'Anne, Princess Royal', gender: 'F', birthYear: '1950' },
  //   { key: 40, parent: 17, name: 'Peter Phillips', gender: 'M', birthYear: '1977' },
  //   { key: 82, parent: 40, name: 'Savannah Phillips', gender: 'F', birthYear: '2010' },
  //   { key: 41, parent: 17, name: 'Zara Phillips', gender: 'F', birthYear: '1981' },
  //   { key: 18, parent: 7, name: 'Prince Andrew', gender: 'M', birthYear: '1960' },
  //   { key: 42, parent: 18, name: 'Princess Beatrice of York', gender: 'F', birthYear: '1988' },
  //   { key: 43, parent: 18, name: 'Princess Eugenie of York', gender: 'F', birthYear: '1990' },
  //   { key: 19, parent: 7, name: 'Prince Edward', gender: 'M', birthYear: '1964' },
  //   { key: 44, parent: 19, name: 'Lady Louise Windsor', gender: 'F', birthYear: '2003' },
  //   { key: 45, parent: 19, name: 'James, Viscount Severn', gender: 'M', birthYear: '2007' },
  // ];

  public diagramDivClassName = 'myDiagramDiv';
  public diagramModelData = { prop: 'value', color: 'red' };
  run
  public dia: any;

  @ViewChild('myDiag', { static: false }) myDiag: DiagramComponent;
  nodes: any = [];
  links: any = [];

  constructor(private cdr: ChangeDetectorRef) {
    const data = [
      {
        "id": "01",
        "name": "Thành phố Hà Nội",
        "type": "Thành phố Trung ương",
        "children": [
          {
            "id": "001",
            "name": "Quận Ba Đình",
            "type": "Quận",
            "children": [
              {
                "id": "00001",
                "name": "Phường Phúc Xá",
                "type": "Phường",
                "children": [
                  {
                    "id": "000009",
                    "name": "Phường Phúc Xá",
                    "type": "Phường",
                    "children": [
                      {
                        "id": "000000010",
                        "name": "Phường Phúc Xáaaaaa",
                        "type": "Phường"
                      },
                      {
                        "id": "000029",
                        "name": "Phường Trúc Bạch",
                        "type": "Phường"
                      },
                    ]
                  },
                  {
                    "id": "000028",
                    "name": "Phường Trúc Bạch",
                    "type": "Phường"
                  },
                ]
              },
              {
                "id": "00004",
                "name": "Phường aaaaa",
                "type": "Phường"
              },
            ]
          },
          {
            "id": "001-2",
            "name": "Quận Ba Đình",
            "type": "Quận",
            "children": [
              {
                "id": "00001-2",
                "name": "Phường Phúc Xá",
                "type": "Phường",
                "children": [
                  {
                    "id": "000009-2",
                    "name": "Phường Phúc Xá",
                    "type": "Phường",
                    "children": [
                      {
                        "id": "000000010-2",
                        "name": "Phường Phúc Xáaaaaa",
                        "type": "Phường"
                      },
                      {
                        "id": "000029-2",
                        "name": "Phường Trúc Bạch",
                        "type": "Phường"
                      },
                    ]
                  },
                  {
                    "id": "000028-2",
                    "name": "Phường Trúc Bạch",
                    "type": "Phường"
                  },
                ]
              },
              {
                "id": "00004-2",
                "name": "Phường aaaaa",
                "type": "Phường"
              },
            ]
          }
        ]
      }
    ]
    this.linkSource(data, 1);
    console.log(this.nodes);

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    const $ = go.GraphObject.make;
    this.myDiag.diagram.nodeTemplate.contextMenu =
      $('ContextMenu',
        $('ContextMenuButton',
          $(go.TextBlock, 'Working Button 1'),
          {
            click: (e, obj) => {
              console.log('e: ', e.diagram.model.modelData.color);
            }
          }
        ),
      );
  }

  initDiagram(): go.Diagram {
    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      layout:  // create a TreeLayout for the family tree
        $(go.TreeLayout,
          {
            treeStyle: go.TreeLayout.StyleLastParents,
            arrangement: go.TreeLayout.ArrangementHorizontal, angle: 90, nodeSpacing: 10, layerSpacing: 40, layerStyle: go.TreeLayout.LayerUniform
          })
    });
    function textStyle() {
      return { font: "9pt sans-serif", stroke: "white" };
    }

    dia.nodeTemplate = $(go.Node, 'Auto',
      new go.Binding('text', 'name'),
      new go.Binding('layerName', 'isSelected', function (sel) { return sel ? 'Foreground' : ''; }).ofObject(),
      $(go.Shape, 'Rectangle',
        {
          name: 'SHAPE', fill: 'lightblue', stroke: null,
          portId: '', fromLinkable: true, toLinkable: true, cursor: 'pointer'
        },
        new go.Binding('fill', '', function (node) {
          // modify the fill based on the tree depth level
          const levelColors = ['#AC193D', '#2672EC', '#8C0095', '#5133AB',
            '#008299', '#D24726', '#008A00', '#094AB2'];
          let color = node.findObject('SHAPE').fill;
          const dia: go.Diagram = node.diagram;
          if (dia && dia.layout.network) {
            dia.layout.network.vertexes.each(function (v: go.TreeVertex) {
              if (v.node && v.node.key === node.data.key) {
                const level: number = v.level % (levelColors.length);
                color = levelColors[level];
              }
            });
          }
          return color;

        }).ofObject()
      ),
      $(go.Shape, "RoundedRectangle",
        {
          name: "SHAPE",
          fill: 'graygrad', stroke: "black",
          portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
        }),
      // define the panel where the text will appear
      $(go.Panel, "Table",
        {
          maxSize: new go.Size(150, 999),
          margin: new go.Margin(3, 3, 0, 3),
          defaultAlignment: go.Spot.Left
        },
        $(go.RowColumnDefinition, { column: 2, width: 4 }),
        $(go.TextBlock,  // the name
          {
            row: 0, column: 0, columnSpan: 5,
            font: "bold 9pt sans-serif",
            editable: true, isMultiline: false,
            stroke: "white", minSize: new go.Size(10, 14),
            name: "name"
          },
          new go.Binding("text", "name").makeTwoWay()),
        $(go.TextBlock, "Title: ", textStyle(),
          { row: 1, column: 0 }),
        $(go.TextBlock, textStyle(),
          {
            row: 1, column: 1, columnSpan: 4,
            editable: true, isMultiline: false,
            minSize: new go.Size(10, 14),
            margin: new go.Margin(0, 0, 0, 3),
            name: "title"
          },
          new go.Binding("text", "title").makeTwoWay()),
        $(go.TextBlock, "ID: ", textStyle(),  // the ID and the boss
          { row: 2, column: 0 }),
        $(go.TextBlock, textStyle(),
          { row: 2, column: 1 },
          new go.Binding("text", "key")),
        $(go.TextBlock, "Boss: ", textStyle(),
          { row: 2, column: 3 }),
        $(go.TextBlock, textStyle(),
          { row: 2, column: 4 },
          new go.Binding("text", "parent")),
        $(go.TextBlock,  // the comments
          {
            row: 3, column: 0, columnSpan: 5,
            font: "italic 9pt sans-serif",
            wrap: go.TextBlock.WrapFit,
            editable: true,  // by default newlines are allowed
            stroke: "white",
            minSize: new go.Size(10, 14),
            name: "comments"
          },
          new go.Binding("text", "comments").makeTwoWay()),
        $("TreeExpanderButton",
          { row: 4, columnSpan: 99, alignment: go.Spot.Center })
      )  // end Table Panel
    );  // end Node
    dia.model = new go.GraphLinksModel(this.links);
    console.log(dia.model);
    this.dia = dia;
    return dia;
  }

  buttonCallback(e, obj) {
    console.log('e2: ', e.diagram.model.modelData.color);
    console.log('this: ', this.name);
  }

  onModelChange($event) {
    console.log('Event: ', $event);
  }
  linkSource(data, level) {
    data.forEach(item => {
      this.nodes.push({
        key: item.id,
        name: item.name,
        level: level
      })
      if (!item.children) {
      }
      if (item.children) {
        item.children.forEach(item2 => {
          this.links.push({
            to: item2.id,
            from: item.id,
          });
        });
        this.linkSource(item.children, level + 1);
      }
    })
  }

}
