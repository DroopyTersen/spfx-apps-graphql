import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import { List } from "office-ui-fabric-react/lib/List";
import { IRectangle } from "office-ui-fabric-react/lib/Utilities";

function VirtualizedGrid<T>({
  items,
  renderItem,
  size = 300,
  rowsPerPage = 3,
  gridGap = 20,
  getKey,
}: VirtualizedGridProps<T>) {
  let columnCountRef = useRef(4);
  let gridWidthRef = useRef(0);
  let itemWidthRef = useRef(0);
  let [forceRefresh, setForceRefresh] = useState("");
  useLayoutEffect(() => {
    setForceRefresh(Date.now() + "");
  }, []);

  return (
    <StyledList
      items={items}
      getKey={getKey}
      columnCount={columnCountRef.current}
      gridWidth={gridWidthRef.current}
      gridGap={gridGap}
      getItemCountForPage={(itemIndex: number, container: IRectangle) => {
        if (itemIndex === 0) {
          gridWidthRef.current = container.width;
          columnCountRef.current = Math.ceil(container.width / size);
          itemWidthRef.current = calculateItemWidth({
            gridWidth: gridWidthRef.current,
            gridGap,
            columnCount: columnCountRef.current,
          });
        }

        // console.log(
        //   "TCL: getItemCountForPage",
        //   gridWidthRef.current,
        //   columnCountRef.current,
        //   itemWidthRef.current
        // );
        return columnCountRef.current * rowsPerPage;
      }}
      onRenderCell={(item: T) => {
        // console.log(
        //   "TCL: onRenderCell",
        //   gridWidthRef.current,
        //   columnCountRef.current,
        //   itemWidthRef.current
        // );
        return renderItem(item, itemWidthRef.current, columnCountRef.current, gridWidthRef.current);
      }}
    />
  );
}

const StyledList = styled(List)`
  width: 100%;
  .ms-List-page {
    display: flex;
    flex-wrap: wrap;
    margin-right: ${(props) => -1 * props.gridGap + "px"};
  }
  .ms-List-cell {
    box-sizing: border-box;
    margin-right: ${(props) => props.gridGap + "px"};
    margin-bottom: ${(props) => props.gridGap + "px"};
    width: ${(props) => calculateItemWidth(props) + "px"};
  }
`;

export interface VirtualizedGridProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  rowsPerPage?: number;
  size?: number;
  gridGap?: number;
  renderItem: (item: T, itemWidth: number, columnCount: number, gridWidth: number) => JSX.Element;
}

const calculateItemWidth = ({ gridWidth, gridGap, columnCount }) => {
  if (!gridWidth) return 0;
  let itemWidth = gridWidth / columnCount - (gridGap * (columnCount - 1)) / columnCount;
  return itemWidth;
};

export default React.memo(VirtualizedGrid);

// SIMPLE USAGE
// <VirtualizedGrid
//   items={photoData.photos}
//   renderItem={(item: Photo, itemWidth) => <PhotoTile photo={item} size={itemWidth + "px"} />}
// />

// ADVANCED USAGE
// <VirtualizedGrid
//   items={photoData.photos}
//   rowsPerPage={3}
//   getKey={(item) => item.id}
//   gridGap={20}
//   size={400}
//   renderItem={(item: Photo, itemWidth) => <PhotoTile photo={item} size={itemWidth + "px"} />}
// />
