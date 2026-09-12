import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import createStopSchema from "../../../validations/stop/createStopSchema";
import { useState } from "react";
import { createStop } from "../../../services/stopService";
import { toast } from "sonner";
import Input from "../../../components/common/Input";
import ErrorMessage from "../../../components/common/ErrorMessage";
import Button from "../../../components/common/Button";
import LocationPickerMap from "../../../components/common/LocationPickerMap"; // <-- Import the new map component

const CreateStop = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createStopSchema),
    defaultValues: {
      stopName: "",
      latitude: "",
      longitude: "",
    },
  });

  const [loading, setLoading] = useState(false);

  // Watch current coordinates to sync the marker position
  const watchedLat = parseFloat(watch("latitude"));
  const watchedLng = parseFloat(watch("longitude"));

  // Callback whenever user clicks, drags, or searches on the map
  const handleLocationSelected = ({ latitude, longitude, stopName }) => {
    setValue("latitude", latitude, { shouldValidate: true });
    setValue("longitude", longitude, { shouldValidate: true });
    if (stopName) {
      setValue("stopName", stopName, { shouldValidate: true });
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await createStop(data);
      toast.success(response.data?.message || "Stop created successfully");
      navigate("/admin/stops");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Create Stop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Button onClick={() => navigate("/admin/stops")}>← Back</Button>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create Stop</h1>
      </div>

      {/* Form & Map Layout */}
      <div className="rounded-lg border border-gray-300 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Left Column: Form Fields */}
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
                  className="block mb-2 font-medium text-gray-700"
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
                  className="block mb-2 font-medium text-gray-700"
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

            {/* Right Column: Interactive Map Picker */}
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
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Stop"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStop;
