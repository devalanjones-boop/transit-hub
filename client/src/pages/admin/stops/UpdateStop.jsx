import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import updateStopSchema from "../../../validations/stop/updateStopSchema";
import { getStopById, updateStop } from "../../../services/stopService";
import { toast } from "sonner";
import Loading from "../../../components/common/Loading";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import LocationPickerMap from "../../../components/common/LocationPickerMap";

const UpdateStop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateStopSchema),
    defaultValues: {
      stopName: "",
      latitude: "",
      longitude: "",
    },
  });

  const watchedLat = parseFloat(watch("latitude"));
  const watchedLng = parseFloat(watch("longitude"));

  const handleLocationSelected = ({ latitude, longitude, stopName }) => {
    setValue("latitude", latitude, { shouldValidate: true });
    setValue("longitude", longitude, { shouldValidate: true });
    if (stopName) {
      setValue("stopName", stopName, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    try {
      setUpdating(true);
      const response = await updateStop(id, data);
      toast.success(response.data?.message || "Stop updated successfully");
      navigate("/admin/stops");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Update Stop");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    const fetchStop = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getStopById(id);
        const stop = response.data?.data;

        reset({
          stopName: stop?.stopName || "",
          latitude: stop?.latitude ?? "",
          longitude: stop?.longitude ?? "",
        });
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load stop");
      } finally {
        setLoading(false);
      }
    };

    fetchStop();
  }, [id, reset]);

  if (loading) {
    return <Loading message="Loading Stop..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button onClick={() => navigate("/admin/stops")}>← Back</Button>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Update Stop</h1>
      </div>

      <div className="rounded-lg border border-gray-300 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="stopName"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Stop Name
                </label>
                <Input
                  id="stopName"
                  {...register("stopName")}
                  placeholder="Enter Stop Name"
                />
                {errors.stopName && (
                  <ErrorMessage message={errors.stopName.message} />
                )}
              </div>

              <div>
                <label
                  htmlFor="latitude"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Latitude
                </label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  {...register("latitude", { valueAsNumber: true })}
                  placeholder="Enter Latitude"
                />
                {errors.latitude && (
                  <ErrorMessage message={errors.latitude.message} />
                )}
              </div>

              <div>
                <label
                  htmlFor="longitude"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Longitude
                </label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  {...register("longitude", { valueAsNumber: true })}
                  placeholder="Enter Longitude"
                />
                {errors.longitude && (
                  <ErrorMessage message={errors.longitude.message} />
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block font-medium text-gray-700">
                Locate on Map
              </label>
              <LocationPickerMap
                latitude={isNaN(watchedLat) ? null : watchedLat}
                longitude={isNaN(watchedLng) ? null : watchedLng}
                onLocationChange={handleLocationSelected}
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" disabled={updating}>
              {updating ? "Updating..." : "Update Stop"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStop;
