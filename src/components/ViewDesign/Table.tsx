export const Table = () => {
  return (
    <div className=" pb-3 pl-3">
      <table className="w-[500px] border-collapse select-none border border-slate-900 p-2">
        <tr className=" mt-0 flex-1 border-b border-slate-900 pt-0 text-slate-300">
          <th>SYMBOL</th>
          <th>REGEND</th>
          <th className=" pl-6 pr-6"></th>
          <th></th>
        </tr>
        <tr className=" font-semibold">
          <td className=" text-center">D1 </td>
          <td>10 x 10 Closed Wall </td>
          <td className=" text-center">D2 </td>
          <td>3 x 7 Walk-in Door </td>
        </tr>
      </table>
    </div>
  );
};
