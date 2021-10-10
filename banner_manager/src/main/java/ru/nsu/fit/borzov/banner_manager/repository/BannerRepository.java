package ru.nsu.fit.borzov.banner_manager.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.nsu.fit.borzov.banner_manager.dto.BannerPreview;
import ru.nsu.fit.borzov.banner_manager.model.Banner;

import java.util.Date;
import java.util.List;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {

    @Query("SELECT b FROM Banner b WHERE b.isDeleted = FALSE")
    List<BannerPreview> getAllPreviews();

    @Query("SELECT b FROM Banner b JOIN b.category c " +
            "WHERE c.reqName LIKE :reqName " +
            "AND b.isDeleted = FALSE " +
            "AND b NOT IN " +
            "(" +
            "   SELECT b_used FROM Request r JOIN r.banner b_used " +
            "   WHERE r.userAgent LIKE :userAgent " +
            "   AND r.ipAddress LIKE :address " +
            "   AND r.date >= :maximumPermissibleDateOfLastRequest " +
            ") " +
            "ORDER BY b.price DESC ")
    List<Banner> getRelevantBanner(String reqName, String userAgent, String address, Date maximumPermissibleDateOfLastRequest);

    @Query("SELECT b FROM Banner b JOIN b.category c WHERE c.id = :id AND b.isDeleted = FALSE")
    List<Banner> findByCategoryId(Long id);

    @Query("SELECT b FROM Banner b WHERE LOWER(b.name) LIKE LOWER(CONCAT('%', :part,'%')) AND b.isDeleted = FALSE")
    List<BannerPreview> findByNamePart(String part);

    @Query("SELECT b FROM Banner b WHERE :name = b.name AND b.isDeleted = FALSE")
    Banner findByName(String name);
}


//    @Query("SELECT (count(b) = 0) FROM Banner b WHERE :id <> b.id AND :name = b.name AND b.isDeleted = FALSE")
//    boolean checkUniq(Long id, String name);

//    @Query("SELECT (count(b) = 0) FROM Banner b WHERE :name = b.name AND b.isDeleted = FALSE")
//    boolean checkUniq(String name);

//    @Query("SELECT b FROM Banner b JOIN b.category c " +
//            "WHERE c.reqName LIKE :reqName " +
//            "AND b.isDeleted = FALSE " +
//            "AND b NOT IN " +
//            "(" +
//            "   SELECT b_used FROM Request r JOIN r.banner b_used " +
//            "   WHERE r.userAgent LIKE :userAgent " +
//            "   AND r.ipAddress LIKE :address " +
//            "   AND SELECT TIMESTAMPDIFF(HOUR,r.date,:currentDate) <= 24  " +
//            ") " +
//            "ORDER BY b.price DESC ")
//    List<Banner> getRelevantBanner(String reqName, String userAgent, String address, Date date);