import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { BiEdit, BiXCircle } from "react-icons/Bi";
import { IoMdCheckmarkCircleOutline } from "react-icons/Io";
import {
  MdOutlineDoNotDisturbAlt,
  MdOutlineLocalPostOffice,
} from "react-icons/md";
import Menu from "../../components/Menu";

function Posts() {
  const [showPost, setShowPost] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showDeny, setShowDeny] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [previousPost, setPreviousPost] = useState(null);
  const [filter, setFilter] = useState("all");
  const [activePost, setActivePost] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState("");
  const [pendingPosts, setPendingPosts] = useState([]);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Det här är en post med id:1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
      status: "pending",
    },
    {
      id: 2,
      title: "Det här är en post med id:2",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.",
      status: "pending",
    },
    {
      id: 3,
      title: "Det här är en post med id:3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      status: "approved",
    },
    {
      id: 4,
      title: "Det här är en post med id:4",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      status: "approved",
    },
    {
      id: 5,
      title: "Det här är en post med id:5",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
      status: "denied",
    },
    {
      id: 6,
      title: "Det här är en post med id:6",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ",
      status: "denied",
    },
    {
      id: 7,
      title: "Det här är en post med id:1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
      status: "pending",
    },
    {
      id: 8,
      title: "Det här är en post med id:2",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.",
      status: "pending",
    },
    {
      id: 9,
      title: "Det här är en post med id:3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      status: "approved",
    },
    {
      id: 10,
      title: "Det här är en post med id:1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
      status: "pending",
    },
    {
      id: 11,
      title: "Det här är en post med id:2",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.",
      status: "pending",
    },
    {
      id: 12,
      title: "Det här är en post med id:3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      status: "approved",
    },
    {
      id: 13,
      title: "Det här är en post med id:4",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      status: "approved",
    },
    {
      id: 14,
      title: "Det här är en post med id:5",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
      status: "denied",
    },
    {
      id: 15,
      title: "Det här är en post med id:6",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ",
      status: "denied",
    },
    {
      id: 16,
      title: "Det här är en post med id:1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
      status: "pending",
    },
    {
      id: 17,
      title: "Det här är en post med id:2",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.",
      status: "pending",
    },
    {
      id: 18,
      title: "Det här är en post med id:3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      status: "approved",
    },
    {
      id: 19,
      title: "Det här är en post med id:4",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      status: "approved",
    },
    {
      id: 20,
      title: "Det här är en post med id:5",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
      status: "denied",
    },
    {
      id: 21,
      title: "Det här är en post med id:6",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ",
      status: "denied",
    },
    {
      id: 22,
      title: "Det här är en post med id:1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
      status: "pending",
    },
    {
      id: 23,
      title: "Det här är en post med id:2",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.",
      status: "pending",
    },
    {
      id: 24,
      title: "Det här är en post med id:3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      status: "approved",
    },
    {
      id: 25,
      title: "Det här är en post med id:4",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      status: "approved",
    },
    {
      id: 26,
      title: "Det här är en post med id:5",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
      status: "denied",
    },
    {
      id: 27,
      title: "Det här är en post med id:6",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ",
      status: "denied",
    },
    {
      id: 28,
      title: "Det här är en post med id:5",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
      status: "denied",
    },
    {
      id: 29,
      title: "Det här är en post med id:6",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ",
      status: "denied",
    },
    {
      id: 30,
      title: "Det här är en post med id:1",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.",
      status: "pending",
    },
    {
      id: 31,
      title: "Det här är en post med id:2",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.",
      status: "pending",
    },
    {
      id: 32,
      title: "Det här är en post med id:3",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.",
      status: "approved",
    },
    {
      id: 33,
      title: "Det här är en post med id:4",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus.",
      status: "approved",
    },
    {
      id: 34,
      title: "Det här är en post med id:5",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
      status: "denied",
    },
    {
      id: 35,
      title: "Det här är en post med id:6",
      text: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. ",
      status: "denied",
    },
  ]);

  function openModal(postId) {
    if (!postId) {
      return;
    }
    const post = posts.find((post) => post.id === postId);
    if (!post) {
      return;
    }
    setShowApprove(false);
    setShowDeny(false);
    setSelectedPost(post);
    setShowPost(true);
  }

  function closeModal() {
    setSelectedPost(null);
    setShowPost(false);
    setEditing(false);
    setEditedText("");
  }

  function handleFilter(e) {
    setFilter(e.target.value);
    closeModal();
  }

  function filteredPosts() {
    if (filter === "approved") {
      return posts.filter((post) => post.status === "approved");
    } else if (filter === "denied") {
      return posts.filter((post) => post.status === "denied");
    } else if (filter === "pending") {
      return posts.filter((post) => post.status === "pending");
    } else if (filter === "all") {
      return posts;
    }
  }

  function handleApprove() {
    setPreviousPost(selectedPost);
    setPosts(
      posts.map((post) => {
        if (post.id === selectedPost.id) {
          return { ...post, status: "approved" };
        }
        return post;
      })
    );
    closeModal();
    setShowApprove(true);
  }

  function handleDeny() {
    setPreviousPost(selectedPost);
    setPosts(
      posts.map((post) => {
        if (post.id === selectedPost.id) {
          return { ...post, status: "denied" };
        }
        return post;
      })
    );
    closeModal();
    setShowDeny(true);
  }

  function handleRegretStatus() {
    setSelectedPost(previousPost);

    setPosts(
      posts.map((post) => {
        if (post.id === previousPost.id) {
          return { ...post, status: previousPost.status };
        }
        return post;
      })
    );
    openModal(previousPost.id);
  }

  function handleTitle() {
    if (filter === "all") {
      return (
        <p className=" text-center mt-5 border-b border-accent w-[80%]">
          INLÄGG
        </p>
      );
    } else if (filter === "pending") {
      return (
        <p className="text-center mt-5 border-b border-accent w-[80%]">NYTT</p>
      );
    } else if (filter === "approved") {
      return (
        <p className=" text-center mt-5 border-b border-accent w-[80%]">
          GODKÄNDA
        </p>
      );
    } else if (filter === "denied") {
      return (
        <p className=" text-center mt-5 border-b border-accent w-[80%]">
          NEKADE
        </p>
      );
    }
  }

  function handleStatus() {
    if (selectedPost.status === "pending") {
      return <p className="text-[#0827F5] ml-2 ">Ny</p>;
    } else if (selectedPost.status === "approved") {
      return <p className="text-[#02CC3B] ml-2 ">Godkänd</p>;
    } else if (selectedPost.status === "denied") {
      return <p className="text-[#FF1C1C] ml-2 ">Nekad</p>;
    }
  }

  function handleEdit(e) {
    setEditing(true);
    setEditedText(e.target.value);
  }

  function handleSaveEdit() {
    setSelectedPost({ ...selectedPost, text: editedText });
    setPosts(
      posts.map((post) => {
        if (post.id === selectedPost.id) {
          return { ...post, text: editedText };
        }
        return post;
      })
    );
    setEditedText("");
    setEditing(false);
  }

  function getPosts() {
    setPendingPosts(posts.filter((post) => post.status === "pending"));
  }
  useEffect(() => {
    getPosts();
  }, []);

  function nextPost() {
    const pendingPosts = filteredPosts().filter(
      (post) => post.status === "pending"
    );
    const currentPostIndex = pendingPosts.findIndex(
      (post) => post.id === selectedPost?.id
    );
    const nextPostIndex = (currentPostIndex + 1) % pendingPosts.length;

    const nextPost = pendingPosts[nextPostIndex];
    setSelectedPost(nextPost);
    openModal(nextPost.id);
  }

  return (
    <div>
      <Helmet>
        <title>Beskrivande text</title>
      </Helmet>
      <Menu />
      <div className="flex flex-row ml-[194px] max-h-screen overflow-auto">
        <div className="flex w-1/2 flex-col mt-10 items-center max-h-full">
          <form>
            <select
              onChange={handleFilter}
              value={filter}
              className="border border-primary p-1 cursor-pointer"
            >
              <option default value="all">
                Alla inlägg
              </option>
              <option value="approved">Godkända inlägg</option>
              <option value="denied">Nekade inlägg</option>
              <option value="pending">Obesvarade inlägg</option>
            </select>
          </form>
          <div className="w-[100%] max-h-full">
            {handleTitle()}
            <ul className="overflow-y-auto touch-auto max-h-full h-[96%] w-[100%]">
              {filteredPosts()
                .filter((post) => post.status === "all")
                .map((post) => (
                  <li
                    className="hover:bg-grey cursor-pointer flex flex-row justify-between p-1"
                    key={post.id}
                    onClick={() => openModal(post.id)}
                  >
                    <p>{post.title}</p>
                    <IoMdCheckmarkCircleOutline className="text-[#02CC3B] p-10" />
                  </li>
                ))}

              {filteredPosts()
                .filter((post) => post.status === "pending")
                .map((post) => (
                  <li
                    className="hover:bg-grey cursor-pointer flex flex-row justify-between p-1"
                    key={post.id}
                    onClick={() => openModal(post.id)}
                  >
                    <p>{post.title}</p>
                    <MdOutlineLocalPostOffice className="text-[#0827F5]" />
                  </li>
                ))}
              <div className=" w-[100%]"></div>
              {filteredPosts()
                .filter((post) => post.status === "approved")
                .map((post) => (
                  <li
                    className="hover:bg-grey cursor-pointer flex flex-row justify-between p-1"
                    key={post.id}
                    onClick={() => openModal(post.id)}
                  >
                    <p>{post.title}</p>
                    <IoMdCheckmarkCircleOutline className="text-[#02CC3B]" />
                  </li>
                ))}

              {filteredPosts()
                .filter((post) => post.status === "denied")
                .map((post) => (
                  <li
                    className="hover:bg-grey cursor-pointer flex flex-row justify-between p-1"
                    key={post.id}
                    onClick={() => openModal(post.id)}
                  >
                    <p>{post.title}</p>
                    <MdOutlineDoNotDisturbAlt className="text-[#FF1C1C]" />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="w-[100%] pt-[114px] max-h-full border-l border-accent overflow-y-auto">
          {showPost ? (
            <div className="">
              <div className="flex justify-end m-4 text-xl">
                {editing ? (
                  <div>
                    <button
                      onClick={() => handleSaveEdit(selectedPost.id)}
                      className=" rounded-3xl bg-[#02CC3B] text-white py-2 px-4"
                    >
                      Spara
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className=" rounded-3xl bg-grey text-black py-2 px-4 ml-2"
                    >
                      Avbryt
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-row">
                    {" "}
                    <BiEdit
                      onClick={handleEdit}
                      className="cursor-pointer text-[#0827F5]"
                    />{" "}
                    <BiXCircle
                      className="cursor-pointer ml-3"
                      onClick={closeModal}
                    />
                  </div>
                )}
              </div>
              <div className="m-10">
                {!editing ? (
                  <div>
                    {" "}
                    <p className="mb-4 flex flex-row">
                      Status: {handleStatus()}
                    </p>
                    <p className="mb-2 text-lg">{selectedPost.title}</p>
                    <p>{selectedPost.text}</p>
                  </div>
                ) : (
                  <textarea
                    id={selectedPost.id}
                    defaultValue={selectedPost.text}
                    value={editedText}
                    onChange={handleEdit}
                    rows="10"
                    className=" w-full"
                  />
                )}

                {!editing ? (
                  <div className="mt-10">
                    <button
                      onClick={() => handleApprove(selectedPost.id)}
                      className=" rounded-3xl bg-[#02CC3B] text-white py-2 px-4"
                    >
                      Godkänn
                    </button>
                    <button
                      onClick={() => handleDeny(selectedPost.id)}
                      className="rounded-3xl bg-[#FF1C1C] text-white py-2 px-8 ml-2"
                    >
                      Neka
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          {showApprove ? (
            <div className="mt-20 ">
              <div className="flex items-center justify-center flex-col">
                <p className="mb-10 text-lg ml-2">
                  Inlägget har <span className="text-[#02CC3B]">godkänts</span>
                </p>
                <div>
                  <button
                    onClick={handleRegretStatus}
                    className="rounded-3xl bg-grey text-black py-2 px-8"
                  >
                    Ångra
                  </button>
                  {pendingPosts && pendingPosts.length > 0 ? (
                    <button
                      onClick={nextPost}
                      className="rounded-3xl bg-[#0827F5] text-white py-2 px-8 ml-4"
                    >
                      Nästa
                    </button>
                  ) : (
                    <p>Det finns inga nya inlägg.</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {showDeny ? (
            <div className="mt-20">
              <div className="flex items-center justify-center flex-col">
                <p className="mb-10 text-lg">
                  Inlägget har <span className="text-[#FF1C1C]">nekats</span>
                </p>
                <div>
                  <button className="rounded-3xl bg-grey text-black py-2 px-8">
                    Ångra
                  </button>
                  {pendingPosts && pendingPosts.length > 0 ? (
                    <button
                      onClick={nextPost}
                      className="rounded-3xl bg-[#0827F5] text-white py-2 px-8 ml-4"
                    >
                      Nästa
                    </button>
                  ) : (
                    <p>Det finns inga nya inlägg.</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Posts;
