import { Card, CardBody, Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';
import SemiCircleProgressBar from "./SemiCircularProgressBar";
import "../../style/MaterialCard.css";
import convertDateTime from '../../helper/convertDateTime'

function MaterialCard({ bloodGroup,volume,currentVolume,lastUpdated}) {
  const percentage = (currentVolume / volume) * 100;
  const bloodInPints = currentVolume;
  return (
    <Card className="bg-[white] group mt-6 sm:w-full md:flex-1 flex items-center transition duration-150 ease-in-out transform hover:scale-105">
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {bloodGroup}
        </Typography>
        <SemiCircleProgressBar percentage={percentage.toFixed(1)} />
        <Typography color="gray" className="mt-2">
          {`${bloodInPints.toFixed(2)} pints`}
        </Typography>
        <Typography color="gray" className="mt-2 text-xs">
          {`Last Updated : ${convertDateTime(lastUpdated)}`}
        </Typography>
      </CardBody>
    </Card>
  );
}

MaterialCard.propTypes = {
  bloodGroup: PropTypes.string.isRequired,
  currentVolume: PropTypes.number.isRequired,
  volume: PropTypes.number.isRequired,
  lastUpdated: PropTypes.string.isRequired,
};

export default MaterialCard;
