import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
import { ArrowDown, ArrowUp, Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useEffectEvent, useRef, useState } from "react";

// 组件的props
export interface IPullListProps<T> {
  initData?: Array<T>;
  getData: (options: { page: number; rows: number }) => Promise<T[]>;
  renderItem: (item: T) => React.ReactNode;
}
// 分页查询的必填字段
interface IPagenationParams {
  page: number;
  rows: number;
}
// 初始化滚动列表
function initBScroll(ele: HTMLElement | string) {
  return new BScroll(ele, {
    scrollY: true,
    scrollX: false,
    bounceTime: TIME_BOUNCE,
    pullDownRefresh: {
      threshold: 70,
      stop: 50,
    },
    pullUpLoad: {
      threshold: 50,
    },
  });
}
// 刷新是的列表回弹时间 （ms）
const TIME_BOUNCE = 800;
// 下拉刷新状态
const PULLING_DOWN_STATE = {
  IDLE: "idle",
  PULLING: "pulling",
  READY: "ready",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

type PullingDownState = typeof PULLING_DOWN_STATE[keyof typeof PULLING_DOWN_STATE];

export default function IPullList<T>({ initData = [], getData, renderItem }: IPullListProps<T>) {
  BScroll.use(PullDown);
  BScroll.use(Pullup);
  const listRef = useRef(null);
  const bscroll = useRef<null | BScroll>(null);

  const [listData, setListData] = useState<T[]>(initData);
  const [isPullUpLoad, setIsPullUpLoad] = useState(false);
  const [pullingDownState, setPullingDownState] = useState<PullingDownState>(PULLING_DOWN_STATE.IDLE);
  const [pagenation, setPagenation] = useState<IPagenationParams>({ page: 1, rows: 10 });
  async function handlePullingUp() {
    console.log("上拉加载更多");
    setIsPullUpLoad(true);
    const res = await getData(pagenation);
    setListData([...listData, ...res]);
    setPagenation((p) => ({ page: p.page + 1, rows: p.rows }));
    setTimeout(() => {
      setIsPullUpLoad(false);
      bscroll.current?.refresh();
      bscroll.current?.finishPullUp();
    }, 100);
  }

  async function handlePullingDown() {
    console.log("下拉刷新");
    setPullingDownState("loading");
    const res = await getData({ page: 1, rows: pagenation.rows });
    setListData(res);
    setTimeout(() => {
      bscroll.current?.finishPullDown();
      bscroll.current?.refresh();
      setPullingDownState("success");
      setPagenation((p) => ({ page: 2, rows: p.rows }));
    }, TIME_BOUNCE + 100);
  }

  const onPullingUp = useEffectEvent(handlePullingUp);
  const onPullingDown = useEffectEvent(handlePullingDown);
  const onEnterThreshold = useEffectEvent(() => {
    setPullingDownState("pulling");
  });
  const onLeaveThreshold = useEffectEvent(() => {
    setPullingDownState("ready");
  });

  useEffect(() => {
    if (!listRef.current) return;
    bscroll.current = initBScroll(listRef.current);
    bscroll.current.on("pullingUp", onPullingUp);
    bscroll.current.on("pullingDown", onPullingDown);
    bscroll.current.on("enterThreshold", onEnterThreshold);
    bscroll.current.on("leaveThreshold", onLeaveThreshold);

    console.log("inited-----------------------------:", listRef.current);
    return () => {
      if (!bscroll.current) return;
      bscroll.current.destroy();
      bscroll.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRef]);

  const renderRefreshing = () => {
    // 下拉刷新的顶部提示
    if (pullingDownState === PULLING_DOWN_STATE.PULLING) {
      return (
        <div className='flex justify-center items-center gap-1'>
          <ArrowDown className='inline' />
          继续下拉进行刷新
        </div>
      );
    } else if (pullingDownState === PULLING_DOWN_STATE.READY) {
      return (
        <div className='flex justify-center items-center gap-1'>
          <ArrowUp className='inline' />
          松开刷新
        </div>
      );
    } else if (pullingDownState === PULLING_DOWN_STATE.LOADING) {
      return (
        <div className='flex justify-center items-center gap-1'>
          <Loader className='animate-spin' />
          <span>刷新中...</span>
        </div>
      );
    } else if (pullingDownState === PULLING_DOWN_STATE.SUCCESS) {
      return <div>刷新成功</div>;
    } else {
      return null;
    }
  };

  function renderLoadMore() {
    if (isPullUpLoad) {
      return (
        <div className='flex justify-center items-center gap-1'>
          <Loader className='animate-spin' />
          <span> 加载中...</span>
        </div>
      );
    } else {
      return <div>上拉加载更多</div>;
    }
  }

  return (
    <div ref={listRef} className='overflow-hidden h-full py-[10px]'>
      <div>
        <div className='absolute w-full p-[20px] box-border text-center text-#999 -translate-y-full translate-z-0'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={pullingDownState}
              initial={{ opacity: 0.1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            >
              {renderRefreshing()}
            </motion.div>
          </AnimatePresence>
        </div>
        <div>{listData.map((t) => renderItem(t))}</div>
        <div className='w-full text-center text-#999 p-[20px]'>{renderLoadMore()}</div>
      </div>
    </div>
  );
}
