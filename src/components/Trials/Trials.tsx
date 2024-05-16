import styles from "./Trials.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Link from "next/link";

const Trials: React.FC = () => {
  const [data, setData] = useState([]);
  const [listView, setListView] = useState<boolean>(false);

  const fetchData = async () => {
    const result = await axios("https://clinicaltrials.gov/api/v2/studies");
    setData(result.data.studies);
  };

  useEffect(() => {
    if (data.length === 0) fetchData();
  }, [data]);

  return (
    <>
      <button onClick={() => setListView(!listView)}>
        {!listView ? "View as list view" : "View as grid view"}
      </button>

      <div
        className={classNames(
          styles.Trials,
          listView && styles.Trials___listView
        )}
      >
        {data?.map((study: any, index) => (
          <Link
            key={index}
            href={
              "singletrial/" + study.protocolSection.identificationModule.nctId
            }
          >
            <div className={styles.Trial}>
              <p>{study.protocolSection.descriptionModule.briefSummary}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Trials;
