package com.gmail.merikbest2015.ecommerce.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Một cuộc hội thoại hỗ trợ giữa 1 khách (guest hoặc user) và shop.
 * Định danh bằng token (UUID do client sinh, lưu localStorage).
 */
@Getter
@Setter
@ToString
@Entity
@Table(name = "conversation")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "token", nullable = false, unique = true)
    private String token;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "last_message_at")
    private LocalDateTime lastMessageAt;

    @Column(name = "last_message", length = 2000)
    private String lastMessage;

    @Column(name = "unread_admin")
    private Integer unreadAdmin;      // tin khách gửi mà admin chưa đọc

    @Column(name = "unread_customer")
    private Integer unreadCustomer;   // tin admin gửi mà khách chưa đọc

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Conversation that = (Conversation) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
