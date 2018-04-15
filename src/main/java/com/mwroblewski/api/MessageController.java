package com.mwroblewski.api;

import com.mwroblewski.entity.Message;
import com.mwroblewski.entity.User;
import com.mwroblewski.exception.Error;
import com.mwroblewski.exception.MessageNotExistsException;
import com.mwroblewski.exception.UserNotExistsException;
import com.mwroblewski.repository.MessageDAO;
import com.mwroblewski.repository.UserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    UserDAO userDAO;
    @Autowired
    MessageDAO messageDAO;

    @GetMapping("/all")
    public List<Message> getAllMessage() {

        return (List<Message>) messageDAO.findAll();
    }

    @GetMapping("/user/all")
    public List<Message> getUserMessage(@AuthenticationPrincipal Principal principal) {

        User user = userDAO.findByUsername(principal.getName());
        return user.getMessages();
    }

    @GetMapping("/user")
    public Message getUserMessagesById(@AuthenticationPrincipal Principal principal, @RequestParam(name = "id", required = true) Integer id) {

        List<Message> messageList = getUserMessage(principal);
        Optional<Message> optional = messageList
                .stream()
                .filter(m -> m.getId() == id.longValue())
                .findFirst();

        if (optional.isPresent())
            return optional.get();
        else
            throw new MessageNotExistsException(id.toString());
    }
    
      @PostMapping("/add")
      public void addMessage(@AuthenticationPrincipal Principal principal, @RequestBody String message) {
    	Message Newmessage = new Message();
        Newmessage.setText(message);
        Newmessage.setCreated(new Date());
        Newmessage.setUser(userDAO.findByUsername(principal.getName()));
        messageDAO.save(Newmessage);
      }

//    @PostMapping("/add")
//    public void sendMessageToUsers(@RequestParam(name = "id", required = true) String bindId, @RequestBody HashMap<String, String> inMessage) {
//        String[] inId = bindId.split(",");
//        List<User> userList = new ArrayList<>();
//        List<String> incorrectId = new ArrayList<>();
//
//        for (String id : inId) {
//            User user = userDAO.findById(Long.parseLong(id));
//            if (user != null)
//                userList.add(user);
//            else
//                incorrectId.add(id);
//        }
//
//        if (userList.size() > 0) {
//            Message message = new Message();
//            message.setText(inMessage.get("text"));
//            message.setCreated(new Date());
//            message.setUsers(userList);
//            messageDAO.save(message);
//        }
//
//        if (incorrectId.size() > 0) {
//            StringBuilder stringBuilder = new StringBuilder();
//            incorrectId.forEach(s ->
//            {
//                stringBuilder.append(s + ", ");
//            });
//            throw new UserNotExistsException(stringBuilder.toString().substring(0, stringBuilder.length() - 2));
//        }
//    }

    @DeleteMapping("/user/delete")
    public void deleteUserMessageById(@AuthenticationPrincipal Principal principal, @RequestParam(name = "id", required = true) Integer id) {

        User user = userDAO.findByUsername(principal.getName());
        List<Message> messageList = getUserMessage(principal);
        Optional<Message> optional = messageList
                .stream()
                .filter(m -> m.getId() == id.longValue())
                .findFirst();

        if (optional.isPresent()) {
            messageList.remove(optional.get());
            user.setMessages(messageList);
            userDAO.save(user);
            messageDAO.delete(optional.get());
        }
        else
            throw new MessageNotExistsException(id.toString());
    }

    @ExceptionHandler(MessageNotExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody Error messageNotExists(MessageNotExistsException e) {
        return new Error("Message with id: " + e.getParameters() + " not exists for the user");
    }

    @ExceptionHandler(UserNotExistsException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody Error userNotExists(UserNotExistsException e) {
        return new Error("Users with ids: {" + e.getParameters() + "} not exists");
    }
}

